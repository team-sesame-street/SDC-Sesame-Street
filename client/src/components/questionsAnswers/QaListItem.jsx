import React, { useState } from 'react';
import axios from 'axios';
import AnswerSubItem from './AnswerSubItem.jsx';
import byHelpfulness from '../../../utils/byHelpfulness.js';
import Spacer from '../../../utils/smallSpacer.jsx';
import randomId from '../../../utils/randomId.js';
import AnswerModal from './AnswerModal.jsx';

import {
  Wrapper,
  QuestionWrap,
  AnswerWrapper,
  SubActionBtn,
  PrimaryBtn,
} from './styles/qalistitem.styles';

function QaListItem({
  result, productMetadata, setTrigger, questions, setQuestions,
}) {
  const [answers, setAnswers] = useState(
    Object.values(result.answers).sort(byHelpfulness),
  );
  const [answerLimit, setAnswerLimit] = useState(2);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  function handleLoadMoreBtn() {
    if (answerLimit <= 2) {
      setAnswerLimit(answers.length + 1);
    } else {
      setAnswerLimit(2);
    }
  }

  const [qVote, setQVote] = useState(result.question_helpfulness);
  const [hasVoted, setHasVoted] = useState(
    localStorage.getItem(`hasVoted-question${result.question_id}`) || false,
  );
  function handleVoteQ() {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${result.question_id}/helpful`, {}, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
      .then(() => {
        setQVote(qVote + 1);
        setHasVoted(true);
        localStorage.setItem(`hasVoted-question${result.question_id}`, qVote + 1);
      })
      .catch((err) => console.error(err));
  }

  function handleAnswerModal() {
    setIsAnswerModalOpen(!isAnswerModalOpen);
  }

  return (
    <Wrapper data-testid="qa-listItem">
      <details open>
        <QuestionWrap>
          <span>
            {result.question_body}
          </span>
          <small>
            Helpful?
            <SubActionBtn type="button" onClick={() => handleVoteQ()} value={hasVoted} data-testid="q-helpful-yes-button" disabled={!!(hasVoted)}>Yes</SubActionBtn>
            (
            {localStorage.getItem(`hasVoted-question${result.question_id}`) || qVote}
            )
            <Spacer />
            <SubActionBtn data-testid="add-answer-button" type="button" onClick={() => handleAnswerModal()}>Add Answer</SubActionBtn>
          </small>
        </QuestionWrap>
        {
          answers.length > 0
          && (
            <AnswerWrapper>
              <div className="answer_label">A:</div>
              <div className="answers_list">
                {answers.slice(0, answerLimit).map((answer) => (
                  <AnswerSubItem key={randomId()} answer={answer} />
                ))}
                {answers.length > 2
                  && (
                    <PrimaryBtn type="button" onClick={() => handleLoadMoreBtn()} data-testid="load-more-answers-btn">
                      {answerLimit === 2
                        ? 'See More Answers'
                        : 'Collapse Answers'}
                    </PrimaryBtn>
                  )}

              </div>
            </AnswerWrapper>
          )
        }
      </details>
      {isAnswerModalOpen
        && (
          <AnswerModal
            key={randomId()}
            productMetadata={productMetadata}
            question={result}
            isAnswerModalOpen={isAnswerModalOpen}
            setIsAnswerModalOpen={() => setIsAnswerModalOpen()}
            setTrigger={setTrigger}
            setAnswers={setAnswers}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
    </Wrapper>
  );
}

export default QaListItem;
