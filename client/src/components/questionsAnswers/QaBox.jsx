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

  return (
    <Wrapper>
      <h2>Questions And Answers</h2>
      {!isLoading ? (
        <QAWrapper>
          {!isLoading && questions.slice(0, questionIndex + 2)
            .map((result) => (
              <QaListItem key={randomId()} result={result} />
            ))}
        </QAWrapper>
      )
        : (
          <>
            <VscLoading style={{ display: 'inline-block' }} />
            Loading...
          </>
        )}
      {!isDone && <button type="button" onClick={handleMoreQuestions} disabled={isLoading}>More Questions</button>}
    </Wrapper>
  );
}

export default QaBox;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 100px auto 0 auto;
  padding-bottom: 100px;
  width: 70%;

  & h2 {
    margin: 1.25rem 0;
  }
`;

const QAWrapper = styled.div`
  max-height: 75vh;
  overflow: auto;
`;

