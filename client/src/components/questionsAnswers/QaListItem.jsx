import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AnswerSubItem from './AnswerSubItem.jsx';
import byHelpfulness from './utils/byHelpfulness.js';
import Spacer from './utils/smallSpacer.jsx'
import randomId from './utils/randomId.js'
import AnswerModal from './AnswerModal.jsx';
import QuestionModal from './QuestionModal.jsx';


function QaListItem({ result, productMetadata, setTrigger }) {
  const [answers, setAnswers] = useState(
    Object.entries(result.answers).sort(byHelpfulness),
  );
  const [answerLimit, setAnswerLimit] = useState(2);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);



  function handleLoadMoreBtn(e) {
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
        localStorage.setItem(`hasVoted-question${result.question_id}`, true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAnswerModal() {
    setIsAnswerModalOpen(!isAnswerModalOpen);
  }

  return (
    <Wrapper>
      <details open>
        <QuestionWrap>
          <span>
            {result.question_body}
          </span>
          <small>
            Helpful?
            {hasVoted ? (
              <SubActionBtn disabled>
                Yes
              </SubActionBtn>
            ) : <SubActionBtn type="button" onClick={() => handleVoteQ()}>Yes</SubActionBtn>}
            (
            {qVote}
            )
            <Spacer />
            <SubActionBtn type="button" onClick={handleAnswerModal}>Add Answer</SubActionBtn>
          </small>
        </QuestionWrap>
        {
          answers.length > 0
          && (
            <AnswerWrapper>
              <div className="answer_label">A:</div>
              <div className="answers_list">
                {answers.slice(0, answerLimit).map((answer) => (
                  <AnswerSubItem key={answer[0]} answer={answer} />
                ))}
                {answers.length > 2
                  && (
                    <PrimaryBtn type="button" onClick={() => handleLoadMoreBtn()}>
                      {answerLimit === 2
                        ? 'Load More Answers'
                        : 'Collapse Answers'}
                    </PrimaryBtn>
                  )}

              </div>
            </AnswerWrapper>
            )
        }
      </details>
      {isAnswerModalOpen
        && <AnswerModal key={randomId()} className="answermodal" productMetadata={productMetadata} question={result} setIsAnswerModalOpen={() => setIsAnswerModalOpen()} setTrigger={setTrigger} />
      }
    </Wrapper>
  );
}

export default QaListItem;

const Wrapper = styled.article`
`;

const QuestionWrap = styled.summary`
  font-size: 1.10rem;
  font-weight: 600;
  border-bottom: 1px solid whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;


  & span::before {
    content: "Q: ";
  }

  & small {
    font-weight: 400;
    font-size: 0.75rem;
    min-width: max-content;
  }
`;

const AnswerWrapper = styled.div`
  max-height: 50vh;
  overflow: auto;
  display: flex;
  padding: 10px;
  gap: 5px;

  & .answer_label {
    font-weight: 600;
    font-size: 1.10rem;
    flex-basis: min-content;
  }

  & .answers_list {
    flex: 1;
  }
`;

const SubActionBtn = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
  &[disabled] {
    color: #666;
    text-decoration: none;
    cursor: revert;
  }
`;

const PrimaryBtn = styled.button`
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  color: #222;
  font-size: 0.85rem;
  padding: 5px 10px;
  margin: 10px 0;

  &&:hover {
    background: #ddd;
  }
`;
