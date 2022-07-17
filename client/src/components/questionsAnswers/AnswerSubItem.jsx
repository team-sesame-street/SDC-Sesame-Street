import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Spacer from '../../../utils/smallSpacer.jsx';
import formatDate from '../../../utils/formatDate.js';
import randomId from '../../../utils/randomId.js';
import ImageViewer from '../../../utils/ImageViewer.jsx';

function AnswerSubItem({ answer }) {
  const {
    body, date, answerer_name, helpfulness, photos, id
  } = answer;
  const [hasVoted, setHasVoted] = useState(
    localStorage.getItem(`hasVoted-answer${id}` || false),
  );
  const [hasReported, setHasReported] = useState(
    localStorage.getItem(`hasReported-answer${id}` || false),
  );

  const [voteCount, setVoteCount] = useState(helpfulness);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  function handleVote() {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/helpful`, {}, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
      .then(() => {
        setHasVoted(true);
        setVoteCount(voteCount + 1);
        localStorage.setItem(`hasVoted-answer${id}`, voteCount + 1);
        return false;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleReport() {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/report`, {}, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
      .then(() => {
        setHasReported(true);
        localStorage.setItem(`hasReported-answer${id}`, true);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Wrapper>
      <div>
        {body}
      </div>
      <ThumbnailWrapper>
        {photos.map((photo) => <Thumbnail key={randomId()} src={photo} onClick={() => setIsImageEnlarged(!isImageEnlarged)} loading="lazy"/>)}
        {isImageEnlarged
        && <ImageViewer photos={photos} cb={()=>setIsImageEnlarged(!isImageEnlarged)} />}
      </ThumbnailWrapper>
      <small>
        <span>
          by
          {" "}
          {answerer_name.toLowerCase() === 'seller' ? <b>{answerer_name}</b> : answerer_name}
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
             {localStorage.getItem(`hasVoted-answer${id}`) || voteCount}
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
  padding-bottom: 1rem;

  & small > div{
    @media(max-width:500px) {
        align-self: flex-end;
        opacity: 0.35;
      }
  }

  @media(max-width: 500px) {
    padding-bottom: 1.5rem;
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

const Thumbnail = styled.img`
  border: 1px solid #222;
  display: inline-block;
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 150px;
  height: 75px;
  margin: 10px 10px 5px 0;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  @media(max-width:500px) {
    & img {
      flex: 1;
    }
  }
`;