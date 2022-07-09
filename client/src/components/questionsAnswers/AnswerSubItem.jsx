import React, { useState } from 'react';
import axios from 'axios';
import formatDate from './utils/formatDate.js';
import styled from 'styled-components';

function AnswerSubItem({ answer }) {
  const [hasVoted, setHasVoted] = useState(
    localStorage.getItem(`hasVoted-answer${answer[0]}` || false),
  );
  const [hasReported, setHasReported] = useState(
    localStorage.getItem(`hasReported-answer${answer[0]}` || false),
  );

  const {
    id, body, date, answerer_name, helpfulness, photos,
  } = answer[1];
  const [voteCount, setVoteCount] = useState(helpfulness);

  function handleVote(e) {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer[0]}/helpful`, {}, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
      .then(() => {
        setHasVoted(true);
        setVoteCount(voteCount + 1);
        localStorage.setItem(`hasVoted-answer${answer[0]}`, true);
        return false;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleReport(e) {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer[0]}/report`, {}, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
      .then(() => {
        setHasReported(true);
        localStorage.setItem(`hasReported-answer${answer[0]}`, true);
      });
  }

  return (
    <div>
      <div>
        A:
        {body}
      </div>
      <small>
        <span>
          {answerer_name === 'Seller' || answerer_name === 'seller' ? <b>{answerer_name}</b> : answerer_name }
        </span>
        <span>
          {formatDate(date)}
        </span>
        <div>
          <span>Helpful? </span>
          <span>
            {hasVoted
              ? 'Yes'
              : <SubActionBtn onClick={handleVote}>Yes</SubActionBtn>}
            (
            {voteCount}
            )
          </span>
          <span>
            {hasReported
              ? 'Reported'
              : <SubActionBtn onClick={handleReport}>Report</SubActionBtn>}
          </span>
        </div>
        <div />
      </small>
    </div>
  );
}

export default AnswerSubItem;

const SubActionBtn = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
