/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import RatingsBar from '../../../../utils/RatingsBar.jsx';

function RatingsBreakdown({ ratings, totalRatings, currRating, setRating }) {
  const [color, setColor] = useState('');

  const barArr = [];
  for (let i = 5; i >= 1; i -= 1) {
    barArr.push(
      <RatingsBar
        fillWidth={(ratings[i] / totalRatings) * 100}
        className={i}
      />,
    );
  }

  const individualBreakdown = {
    display: 'flex',
    alignItems: 'baseline',
    cursor: 'pointer',
    fontSize: '18px',
  };

  function handleEnter(event) {
    event.target.style.backgroundColor = "blue";
  }

  function handleLeave(event) {
    event.target.style.backgroundColor = "";
  }

  function handleClick(event) {
    const key = event.target.className;
    setRating({ ...currRating, [key]: !currRating[key] });
  }

  return (
    <div>
      Rating Breakdown:
      <div style={barStyling}>
        {barArr.map((ratingBar, i) => (
          <div style={individualBreakdown} key={[i]} className={5 - i} onClick={handleClick} onKeyPress={handleClick} role="button" tabIndex="0" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
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
};

export default RatingsBreakdown;
