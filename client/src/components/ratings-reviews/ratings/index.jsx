/* eslint-disable react/prop-types */
import React from 'react';
import StarRatings from 'react-star-ratings';
import getTotalRatings from '../../../../utils/getTotalRatings.js';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import ProductBreakdown from './RatingsProductBreakdown.jsx';

const styles = {
  ratingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },

  flexContainer: {
    display: 'flex',
  },

  numRatingStyle: {
    fontSize: 60,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },

  breakdownContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default function Ratings({
  meta, currRating, setRating, filterRatings, setAvgRating,
}) {
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
  setAvgRating(starRating);
  return (
    <div style={styles.ratingsContainer}>
      <div style={styles.flexContainer}>
        <div style={styles.numRatingStyle}>
          {numRating}
        </div>
        <StarRatings rating={starRating} starDimension="18px" starSpacing="2px" starRatedColor="goldenrod" />
      </div>
      <div style={styles.breakdownContainer}>
        <RatingsBreakdown
          ratings={ratings}
          totalRatings={totalRatings}
          currRating={currRating}
          setRating={setRating}
          filterRatings={filterRatings}
          meta={meta}
        />
      </div>
      <div>
        <ProductBreakdown meta={meta} />
      </div>
    </div>
  );
}
