import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QaListItem from './QaListItem.jsx';
import randomId from '../../../utils/randomId.js';
import QuestionModal from './QuestionModal.jsx';
import LoadingCircle from '../../../utils/LoadingCircle.jsx';
import { Wrapper } from './styles/qawrapper.styles';

function QAWrapper({ questions, setQuestions, productMetadata, checks, setChecks, searchTerm, questionIndex, page }) {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // when question modal sends a POST request
    setChecks({ ...checks, isLoading: true });
    // download all pages up to a certain page
    axios.get(`/qa/questions/${productMetadata.product_id}/all/${page}`)
      .then(({ data }) => {
        setQuestions(data);
        setChecks({ ...checks, isLoading: false });
        document.querySelector('.qa-wrapper')?.scrollTo({ top: document.querySelector('.qa-wrapper').scrollHeight });
      })
      .catch((err) => console.error(err));
  }, [trigger]);

  return (
    <Wrapper data-testid="qa-wrapper" className="qa-wrapper">
      {checks.isLoading ? <LoadingCircle />
        : questions
          .filter(
            (question) => {
              if (searchTerm.length >= 3) {
                return question
                  .question_body
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              }
              return question?.question_body;
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
              page={page}
              questions={questions}
              setQuestions={setQuestions}
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
            setTrigger={setTrigger}
          />
        )}
    </Wrapper>
  );
}

export default QAWrapper;
