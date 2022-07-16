/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import RatingsBar from '../../../../utils/RatingsBar.jsx';
import getPercentage from '../../../../utils/getPercentage.js';

function RatingsBreakdown({ ratings, totalRatings, currRating, setRating, filterRatings, meta }) {
  const barArr = [];
  for (let i = 5; i >= 1; i -= 1) {
    barArr.push(
      <RatingsBar
        fillWidth={getPercentage(ratings[i], totalRatings)}
        className={i}
      />,
    );
  }

  function handleClick(event) {
    const key = event.currentTarget.id;
    if (key === 'remove-filter') {
      event.preventDefault();
      setRating({
        1: false, 2: false, 3: false, 4: false, 5: false,
      });
    } else {
      setRating({ ...currRating, [key]: !currRating[key] });
    }
  }

  function getRecommended() {
    const rec = meta.recommended;
    const totalRec = Number(rec.true) + Number(rec.false);
    return `${getPercentage(rec.true, totalRec)}% `;
  }

  return (
    <div style={stylingContainer}>
      <div style={recommendStyling}>
        {meta && getRecommended()}
        of reviews recommend this product
      </div>
      {filterRatings && (<a href="#" onClick={handleClick} id="remove-filter" style={removeFilterStyling}>Remove all filters</a>)}
      <div style={barStyling}>
        {barArr.map((ratingBar, i) => (
          <IndividualBreakdown style={currRating[5 - i] ? individualBreakdownSelected : individualBreakdown} key={[i]} id={5 - i} role="button" tabIndex="0" onClick={handleClick}>
            {5 - i}
            {' '}
            stars
            {ratingBar}
            {getPercentage(ratings[5 - i], totalRatings)}
            %
          </IndividualBreakdown>
        ))}
      </div>
    </div>
  );
}

const barStyling = {
  display: 'flex',
  flexDirection: 'column',
};

const recommendStyling = {
  fontFamily: 'arial',
  fontSize: '16.5px',
};

const stylingContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const removeFilterStyling = {
  display: 'flex',
  color: 'crimson',
  width: '150px',
};

const individualBreakdown = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '18px',
};

const individualBreakdownSelected = {
  display: 'flex',
  alignItems: 'baseline',
  cursor: 'pointer',
  fontSize: '18px',
  backgroundColor: 'lightGreen',
};

const IndividualBreakdown = styled.div`
  &:hover {
    background: lightGreen;
  }
`;

export default RatingsBreakdown;
