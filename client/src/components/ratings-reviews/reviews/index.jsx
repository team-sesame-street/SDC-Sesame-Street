/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import ReviewsRatings from './ReviewsRatings.jsx';
import ReviewsDate from './ReviewsDate.jsx';

function Reviews({ reviews }) {
  console.log('class: ', reviews);

  return (
    <div style={reviewsContainer}>

      {reviews.map((review) => {
        const summ = review.summary;
        return (
          <div key={review.review_id}>
            <ReviewsRatings rating={review.rating} />
            <ReviewsDate date={review.date} />
            <br />
            {summ.length > 60 ? (
              <span style={summaryContainer}>
                {`${summ.slice(0, 61)}...`}
                <p style={bodyContainer}>
                  {`...${summ.slice(61)}`}
                  <br />
                </p>
              </span>
            ) : (
              <span style={summaryContainer}>
                {summ}
              </span>
            )}
            <p>
              <br />
              {review.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}

const reviewsContainer = {

};

const summaryContainer = {
  fontWeight: 'bold',
};

const bodyContainer = {
  fontWeight: 'normal',
};

export default Reviews;
