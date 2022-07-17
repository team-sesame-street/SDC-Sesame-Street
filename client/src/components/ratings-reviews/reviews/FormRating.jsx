/* eslint-disable react/prop-types */
import React from 'react';
import StarRatings from 'react-star-ratings';

export default function FormRating({ starRating, changeRating }) {
  return (
    <StarRatings
      changeRating={(rating) => { changeRating(rating); }}
      starDimension="22px"
      starSpacing="2px"
      starRatedColor="black"
      starHoverColor="black"
      rating={starRating}
    />
  );
}
