import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VscLoading } from 'react-icons/vsc';
import QaListItem from './QaListItem.jsx';
import randomId from './utils/randomId.js';

function QaBox({ id }) {
  const [currProductName, setCurrProductName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondPass, setSecondPass] = useState(false);
  const [isPageDone, setIsPageDone] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArr, setFilteredArr] = useState(questions);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const [num, setNum] = useState(0);
  const [allQs, setAllQs] = useState([]);
  const [numPage, setNumPage] = useState(1);

  useEffect(() => {
    if (num !== 0) {
      setIsLoading(true);
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${id}`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
        params: {
          page: numPage,
        },
      }).then(({ data }) => {

        if (data.results.length > 0) {
          setAllQs([...allQs, ...data.results]);
          setNumPage(numPage + 1);
        } else {
          setQuestions(allQs);
          setFilteredArr(allQs);
          setIsLoading(false);
          setIsPageDone(true);
        }
      });
    }
  }, [num, numPage]);


  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
      params: {
        page,
      },
    })
      .then(({ data }) => {
        setQuestions([...questions, ...data.results]);
        setFilteredArr(questions);

        if (data.results.length === 0) {
          setIsPageDone(true);
        }

        if (questions.length < 2 && !secondPass) {
          setPage(page + 1);
          setSecondPass(true);
        }
        if (secondPass && questions.length <= 2) {
          setIsDone(true);
        }

        setIsLoading(false);
      });
  }, [id, page]);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      }
    })
      .then(({ data }) => {
        setCurrProductName(data.name);
      });
  }, [id]);

  function handleMoreQuestions() {
    setIsLoading(true);
    if (!isPageDone) {
      setPage(page + 1);
    }

    document.querySelector('#bottom').scrollIntoView();
    if (questions.length - 3 > questionIndex + 1) {
      setQuestionIndex(questionIndex + 2);
    } else {
      setQuestionIndex(questionIndex + 1);
      setIsDone(true);
    }

    setIsLoading(false);
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      setFilteredArr(
        questions
          .filter((question) => question.question_body.toLowerCase()
            .includes(e.target.value.toLowerCase())
          )
      );
    } else if (e.target.value.length < 3) {
      setFilteredArr(questions);
    }
  }

  function handleAddQuestion(e) {
    setIsQuestionModalOpen(!isQuestionModalOpen);
  }

  return (
    <Wrapper>

      <h2>Questions And Answers</h2>
      <SearchBarWrapper>
        <input type="textbox" placeholder="Have a question? Search for answers…" value={searchTerm} onChange={handleChange} />
      </SearchBarWrapper>
      {!isLoading ? (
        <QAWrapper id="qwrap">
          {!isLoading && filteredArr.slice(0, questionIndex + 2)
            .map((result) => (
              <QaListItem key={randomId()} result={result} id="curr" currProductName={currProductName} product_id={id} setIsQuestionModalOpen={setIsQuestionModalOpen} isQuestionModalOpen={isQuestionModalOpen} setQuestions={setQuestions} questions={questions} setNum={setNum} />
            ))}
          <div id="bottom">.</div>
        </QAWrapper>
      )
        : (
          <>
            <VscLoading style={{ display: 'inline-block' }} />
            Loading...
          </>
        )}
      {!isDone && <button type="button" onClick={handleMoreQuestions} disabled={isLoading} className="QAButton" disabled={isLoading}>More Questions</button>}
      <button type="button" disabled={isLoading} onClick={handleAddQuestion} className="QAButton" disabled={isLoading}>Add a Question</button>
    </Wrapper>
  );
}

export default QaBox;

const Wrapper = styled.div`
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 100px auto 0 auto;
  padding-bottom: 4rem;
  width: 70%;


  & h2 {
    margin: 1.25rem 0;
  }

  & .QAButton {
    text-transform: uppercase;
    font-weight: 700;
    padding: 1rem 5rem;
    background: none;
    border: 1px solid #222;
    margin-right: 10px;
    &:hover {
      color: #eee;
      background: #222;
    }
    &:disabled {
      background: grey;
      color: white;
      opacity: 0.25;
    }
  }

`;

const QAWrapper = styled.div`
  max-height: 75vh;
  overflow: auto;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
  & input {
    border: 1px solid #333;
    width: 100%;
    height: 100%;
    background: url('https://i.ibb.co/bJTc5MD/noun-search-4968922.webp') no-repeat right 10px center;
    background-size: 25px 25px;
    padding: 0.5rem 0.6rem;
  }
  & input:hover, input:focus {
    background-color: #f1f1f1;
  }
`;
