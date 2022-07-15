import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QaListItem from './QaListItem.jsx';
import randomId from '../../../utils/randomId.js';
import axios from 'axios';
import QuestionModal from './QuestionModal.jsx';

function QAWrapper({ questions, setQuestions, productMetadata, checks, setChecks, searchTerm, questionIndex, setIsPageDone }) {
  const [trigger, setTrigger] = useState(0);
  const [allQs, setAllQs] = useState([]);
  const [resetPage, setResetPage] = useState(1);
  const [count, setCount] = useState(0);
  const [oldTrigger, setOldTrigger] = useState(trigger);

  useEffect(() => {
    setOldTrigger(trigger);
    if (trigger !== 0) {
      if (trigger !== oldTrigger) {
        setAllQs([]);
        setCount(0);
        setResetPage(1);
      }

      setChecks({ ...checks, isLoading: true });
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productMetadata.product_id}`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
        params: {
          page: resetPage,
        },
      }).then(({ data }) => {
        setChecks({ ...checks, isLoading: true, isQuestionModalOpen: false });
        if (data.results.length > 0) {
          setAllQs([...allQs, ...data.results]);
          setResetPage(resetPage + 1);
        } else if (data.results.length === 0) {
          setCount(count + 1);
          if (count < 2) {
            setResetPage(resetPage + 1);
          } else {
            setQuestions(allQs);
            setChecks({ ...checks, isLoading: false });
            setIsPageDone(true);
          }
        }
      });
    }
  }, [trigger, resetPage]);

  return (
    <Wrapper data-testid="qa-wrapper" className="qa-wrapper">
      {
        questions
          .filter(
            (question) => {
              if (searchTerm.length >= 3) {
                return question
                  .question_body
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              }
              return question.question_body;
            }
          )
          .slice(0, questionIndex + 2)
          .map((result) => (
            <QaListItem
              key={randomId()}
              result={result}
              productMetadata={productMetadata}
              checks={checks}
              setChecks={setChecks}
              setTrigger={setTrigger}
            />
          ))
      }
      {checks.isQuestionModalOpen
        && (
          <QuestionModal
            data-test-id="question-modal-wrapper"
            productMetadata={productMetadata}
            checks={checks}
            setChecks={setChecks}
            setTrigger={setTrigger} />
        )}
    </Wrapper>
  )
}

export default QAWrapper;

const Wrapper = styled.div`
  max-height: 65vh;
  overflow: auto;
`;
