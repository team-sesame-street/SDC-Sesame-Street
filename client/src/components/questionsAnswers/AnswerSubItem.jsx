import React, { useState } from 'react';
import axios from 'axios';
import Spacer from '../../../utils/smallSpacer.jsx';
import formatDate from '../../../utils/formatDate.js';
import randomId from '../../../utils/randomId.js';
import ImageViewer from '../../../utils/ImageViewer.jsx';

import {
  Wrapper,
  SubActionBtn,
  Thumbnail,
  ThumbnailWrapper,
} from './styles/answersubitem.styles';

function AnswerSubItem({ answer }) {
  const {
    body,
    date,
    answerer_name,
    helpfulness,
    photos,
    id,
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
        {photos.map((photo) => <Thumbnail key={randomId()} src={photo} onClick={() => setIsImageEnlarged(!isImageEnlarged)} loading="lazy" />)}
        {isImageEnlarged
        && <ImageViewer photos={photos} cb={() => setIsImageEnlarged(!isImageEnlarged)} />}
      </ThumbnailWrapper>
      <small>
        <span>
          by
          {' '}
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
