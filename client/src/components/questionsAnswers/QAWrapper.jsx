import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QaListItem from './QaListItem.jsx';
import randomId from './utils/randomId.js';
import axios from 'axios';
import QuestionModal from './QuestionModal.jsx';

function QAWrapper({ questions, setQuestions, productMetadata, checks, setChecks, searchTerm, questionIndex }) {
  const [trigger, setTrigger] = useState(0);
  const [allQs, setAllQs] = useState([]);
  const [resetPage, setResetPage] = useState(1);

  useEffect(() => {
    if (trigger !== 0) {
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
        } else {
          setQuestions(allQs);
          setChecks({ ...checks, isLoading: false, isPageDone: true });
        }
      });
    }
  }, [trigger, resetPage]);

  return (
    <Wrapper>
      {
        questions
          .filter(
            (question) => question.question_body.toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .slice(0, questionIndex + 2)
          .map((result) => (
            <QaListItem key={randomId()} result={result} productMetadata={productMetadata} checks={checks} setChecks={setChecks} setTrigger={setTrigger} />
          ))
      }
      {checks.isQuestionModalOpen
        && (
          <QuestionModal
            productMetadata={productMetadata}
            checks={checks}
            setChecks={setChecks}
            setTrigger={setTrigger} />
        )}

      <div id="bottom">.</div>
    </Wrapper>
  )
}

export default QAWrapper;

const Wrapper = styled.div`
  max-height: 65vh;
  overflow: auto;
`;
