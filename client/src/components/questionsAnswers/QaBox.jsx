import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VscLoading } from 'react-icons/vsc';
import QaListItem from './QaListItem.jsx';
import randomId from './utils/randomId.js';

function QaBox({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondPass, setSecondPass] = useState(false);
  const [isPageDone, setIsPageDone] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArr, setFilteredArr] = useState(questions);

  useEffect(() => {
    if (id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${id}`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
        params: {
          page,
        },
      })
        .then(({ data }) => {
          // any new data from a page will be placed at the
          // end of the previous questions collected
          if (data.results.length !== 0) {
            setQuestions([...questions, ...data.results]);
            setFilteredArr(questions);
          }

          // if a page does not contain any items,
          // stop calling for more pages!
          if (data.results.length === 0) {
            setIsPageDone(true);
          }

          // if after the first pass (first ajax call), question
          // contains less than two items, this will run again.
          if (questions.length < 2 && !secondPass) {
            setPage(page + 1);
            setSecondPass(true);
          }
          if (secondPass && questions.length <= 2) {
            setIsDone(true);
          }

          setIsLoading(false);
        });
    }
  }, [id, page]);

  async function handleMoreQuestions() {
    setIsLoading(true);
    if (!isPageDone) {
      setPage(page + 1);
    }

    document.querySelector('#bottom').scrollIntoView();
    // This snippet will continue going through the questions array
    // until it is at end AND then remove the 'More Questions' button
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
    console.log(e.target.value);
    if (e.target.value.length >= 3) {
      setFilteredArr(
        questions
          .filter((question) => question.question_body.toLowerCase()
            .includes(e.target.value.toLowerCase())));
    } else if (e.target.value.length < 3) {

      setFilteredArr(questions);
    }
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
              <QaListItem key={randomId()} result={result} id="curr"/>
            ))}
            <div id="bottom">---</div>
        </QAWrapper>
      )
        : (
          <>
            <VscLoading style={{ display: 'inline-block' }} />
            Loading...
          </>
        )}
      {!isDone && <button type="button" onClick={handleMoreQuestions} disabled={isLoading} id="moreQbtn">More Questions</button>}
    </Wrapper>
  );
}

export default QaBox;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 100px auto 0 auto;
  padding-bottom: 4rem;
  width: 70%;

  & h2 {
    margin: 1.25rem 0;
  }

  & #moreQbtn {
    text-transform: uppercase;
    font-weight: 700;
    padding: 1rem 5rem;
    background: none;
    border: 1px solid #222;
    &:hover {
      color: #eee;
      background: #222;
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
