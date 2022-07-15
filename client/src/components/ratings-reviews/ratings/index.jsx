/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import StarRatings from 'react-star-ratings';
import getTotalRatings from '../../../../utils/getTotalRatings.js';
import RatingsBreakdown from './RatingsBreakdown.jsx';

function Ratings({ meta, currRating, setRating, filterRatings }) {
  let rating = 0;
  let totalRatings = 0;
  let ratings = {};
  if (meta) {
    ratings = meta.ratings;
    totalRatings = getTotalRatings(ratings);
    const ratingsKeys = Object.keys(ratings).map(Number);
    rating = ratingsKeys.reduce((total, key) => total + (
      key * Number(ratings[key])), 0) / totalRatings;
  }
  const numRating = Math.round(rating * 10) / 10;
  const starRating = Math.round(rating * 4) / 4;
  return (
    <div style={ratingsContainer}>
      <div style={flexContainer}>
        <div style={numRatingStyle}>
          {numRating}
        </div>
        <StarRatings rating={starRating} starDimension="18px" starSpacing="2px" starRatedColor="black" />
      </div>
      <div style={breakdownContainer}>
        <RatingsBreakdown
          ratings={ratings}
          totalRatings={totalRatings}
          currRating={currRating}
          setRating={setRating}
          filterRatings={filterRatings}
        />
      </div>
    </div>
  );
}

const ratingsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

const flexContainer = {
  display: 'flex',
};

const numRatingStyle = {
  fontSize: 60,
  fontFamily: 'Arial',
  fontWeight: 'bold',
};

const breakdownContainer = {
  display: 'flex',
  flexDirection: 'column',
};

export default Ratings;
