import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Spacer from '../../../utils/smallSpacer.jsx';
import formatDate from '../../../utils/formatDate.js';
import randomId from '../../../utils/randomId.js';

function AnswerSubItem({ answer }) {
  const [hasVoted, setHasVoted] = useState(
    localStorage.getItem(`hasVoted-answer${answer[0]}` || false),
  );
  const [hasReported, setHasReported] = useState(
    localStorage.getItem(`hasReported-answer${answer[0]}` || false),
  );

  const {
    body, date, answerer_name, helpfulness, photos,
  } = answer[1];
  const [voteCount, setVoteCount] = useState(helpfulness);

  function handleVote() {
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

  function handleReport() {
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
    <Wrapper>
      <div>
        {body}
      </div>
      <div>
        {photos.map((photo) => <Thumbnail key={randomId()} src={photo} loading="lazy"/>)}
      </div>
      <small>
        <span>
          by
          {" "}
          {answerer_name === 'Seller' || answerer_name === 'seller' ? <b>{answerer_name}</b> : answerer_name}
        </span>
        <Spacer />
        <span>
          {formatDate(date)}
        </span>
        <div>
          <span>Helpful?</span>
          <span>
            {hasVoted
              ? (
                <SubActionBtn disabled>
                  Yes
                </SubActionBtn>
              )
              : <SubActionBtn onClick={() => handleVote()}>Yes</SubActionBtn>}
            (
            {voteCount}
            )
          </span>
          <Spacer />
          <span>
            {hasReported
              ? (
                <SubActionBtn disabled>
                  Reported
                </SubActionBtn>
              )
              : <SubActionBtn onClick={() => handleReport()}>Report</SubActionBtn>}
          </span>
        </div>
        <div />
      </small>
    </Wrapper>
  );
}

export default AnswerSubItem;

const Wrapper = styled.div`
  border-bottom: 1px solid whitesmoke;
  padding-bottom: 10px;
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

const Thumbnail = styled.img`
  border: 1px solid #222;
  display: inline-block;
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 150px;
  height: 75px;
  margin: 10px 10px 5px 0;
`;
