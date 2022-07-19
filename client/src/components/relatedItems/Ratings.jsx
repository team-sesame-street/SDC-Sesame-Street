/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import StarRatings from 'react-star-ratings';

function Ratings({ rating }) {
  const starRating = Math.round(rating * 4) / 4;
  return (
    <div data-testid='ratings'>
      <StarRatings rating={starRating} starDimension="18px" starSpacing="2px" starRatedColor="black" />
    </div>
  );
}

export default Ratings;
