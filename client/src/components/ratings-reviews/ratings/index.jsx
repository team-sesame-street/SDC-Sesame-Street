/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import StarRatings from 'react-star-ratings';
import getTotalRatings from '../../../../utils/getTotalRatings.js';

function Ratings({ meta }) {
  let rating = 0;
  if (meta) {
    const { ratings } = meta;
    const totalRatings = getTotalRatings(ratings);
    const ratingsKeys = Object.keys(ratings).map(Number);
    rating = ratingsKeys.reduce((total, key) => total + (
      key * Number(ratings[key])), 0) / totalRatings;
  }
  const numRating = Math.round(rating * 10) / 10;
  const starRating = Math.round(rating * 4) / 4;
  return (
    <div style={flexContainer}>
      <div style={numRatingStyle}>
        {numRating}
      </div>
      <StarRatings rating={starRating} starDimension="18px" starSpacing="2px" starRatedColor="black" />
    </div>
  );
}

const numRatingStyle = {
  fontSize: 60,
  fontFamily: 'Arial',
  fontWeight: 'bold',
};

const flexContainer = {
  display: 'flex',
};

export default Ratings;
