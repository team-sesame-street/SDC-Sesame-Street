/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

function RatingsBreakdown({ ratings, totalRatings }) {
  console.log(totalRatings);
  console.log('ratings2', ratings);
  const barArr = [];
  for (let i = 5; i >= 1; i -= 1) {
    barArr.push(
      <ProgressBar
        completed={ratings[i]}
        maxCompleted={totalRatings}
        customLabel=" "
        className="test"
        bgColor="limeGreen"
        baseBgColor="lightGray"
        height="13px"
        width="1300%"
      />,
    );
  }

  function handleClick(event) {
    console.log(event.target.className);
  }

  return (
    <div>
      Rating Breakdown:
      <div style={barStyling}>
        {barArr.map((ratingBar, i) => (
          <div style={individualBreakdown} key={i} className={5 - i} onClick={handleClick}>
            {5 - i}
            {' '}
            stars
            {ratingBar}
          </div>
        ))}
      </div>
    </div>
  );
}

const barStyling = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const individualBreakdown = {
  display: 'flex',
  gap: '10px',
  alignItems: 'baseline',
  cursor: 'pointer',
  fontSize: '18px',
};

export default RatingsBreakdown;
