/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import RatingsBar from '../../../../utils/RatingsBar.jsx';

function RatingsBreakdown({ ratings, totalRatings }) {
  const [color, setColor] = useState('')
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
    backgroundColor: color,
  };

  function handleClick(event) {
    console.log(event.target.className);
  }

  return (
    <div>
      Rating Breakdown:
      <div style={barStyling}>
        {barArr.map((ratingBar, i) => (
          <div style={individualBreakdown} key={[i]} className={5 - i} onClick={handleClick} onKeyPress={handleClick} onMouseEnter={() => setColor('pink')} onMouseLeave={() => setColor('')} role="button" tabIndex="0">
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
