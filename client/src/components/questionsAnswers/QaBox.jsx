import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import QAWrapper from './QAWrapper.jsx';
import { Wrapper, PrimaryBtnGroup } from './styles/qabox.styles';

function QaBox({ currProduct }) {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [productMetadata, setProductMetadata] = useState({
    product_id: currProduct.id,
    productName: currProduct.name,
  });
  const [checks, setChecks] = useState({
    isLoading: true,
    isDone: false,
    isQuestionModalOpen: false,
  });
  const [isPageDone, setIsPageDone] = useState(false);

  useEffect(() => {
    setProductMetadata({ productName: currProduct.name, product_id: currProduct.id });
    setQuestions([]);
    setPage(1);
    setQuestionIndex(0);
    setIsPageDone(false);
    setSearchTerm('');
    setChecks({
      isLoading: true,
      isDone: false,
      isQuestionModalOpen: false,
    });
    setCount(0);
  }, [currProduct]);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${currProduct.id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
      params: {
        page,
      },
    })
      .then(({ data }) => {
        if (data.results.length === 0 && !isPageDone) {
          setCount(count + 1);
          if (count >= 7) {
            setIsPageDone(true);
          } else if ((count < 7 && !isPageDone) || data.results.length === 1) {
            setPage(page + 1);
          }
        } else {
          const freshData = [...questions, ...data.results];

          const uniq = [];
          const qsWithoutDups = freshData.filter((el) => {
            const duplicate = uniq.includes(el.question_id);
            if (!duplicate) {
              uniq.push(el.question_id);
              return true;
            }
            return false;
          });
          setQuestions(qsWithoutDups);

          if (questions.length < 2 && !isPageDone) {
            setPage(page + 1);
          }
        }
        setChecks({ ...checks, isLoading: false });
      })
      .catch((err) => console.error(err));
  }, [page]);

  useEffect(() => {
    document.querySelector('.qa-wrapper')?.scrollTo({ top: document.querySelector('.qa-wrapper').scrollHeight, behavior: 'smooth' });
  }, [questionIndex]);

  function handleMoreQuestions() {
    setChecks({ ...checks, isLoading: true });
    if (!isPageDone) {
      setPage(page + 1);
    }

    if (questions.length - 1 > questionIndex) {
      setQuestionIndex(questionIndex + 2);
    } else {
      setQuestionIndex(questionIndex + 1);
      // setChecks({ ...checks, isDone: true });
    }
    setChecks({ ...checks, isLoading: false });
  }

  function handleAddQuestion() {
    setChecks({ ...checks, isQuestionModalOpen: !checks.isQuestionModalOpen });
  }

  return (
    <Wrapper data-testid="qa-component">
      <h2 className="qa-component-header">Questions And Answers</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <QAWrapper
        questions={questions}
        setQuestions={setQuestions}
        productMetadata={productMetadata}
        questionIndex={questionIndex}
        searchTerm={searchTerm}
        checks={checks}
        setChecks={setChecks}
        page={page}
      />
      <PrimaryBtnGroup>
        {!checks.isDone
          && (<button type="button" onClick={() => handleMoreQuestions()} disabled={checks.isLoading} className="QAButton">More Questions</button>)}
        <button type="button" disabled={checks.isLoading} onClick={() => handleAddQuestion()} className="QAButton" data-testid="qa-addqbtn">Add a Question</button>
      </PrimaryBtnGroup>
    </Wrapper>
  );
}

export default QaBox;
