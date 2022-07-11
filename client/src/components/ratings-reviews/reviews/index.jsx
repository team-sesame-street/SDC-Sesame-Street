/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import ReviewsRatings from './ReviewsRatings.jsx';
import ReviewsDate from './ReviewsDate.jsx';
import ReviewsUser from './ReviewsUser.jsx';

function Reviews({ reviews }) {
  console.log('class: ', reviews);

  return (
    <div style={reviewsContainer}>
      {reviews.map((review) => {
        const revSumm = review.summary;
        return (
          <div key={review.review_id}>
            <ReviewsRatings rating={review.rating} />
            <ReviewsUser user={review.reviewer_name} />
            <ReviewsDate date={review.date} />
            <br />
            {revSumm.length > 60 ? (
              <span style={summaryContainer}>
                {`${revSumm.slice(0, 61)}...`}
                <p style={bodyContainer}>
                  {`...${revSumm.slice(61)}`}
                  <br />
                </p>
              </span>
            ) : (
              <span style={summaryContainer}>
                {revSumm}
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
