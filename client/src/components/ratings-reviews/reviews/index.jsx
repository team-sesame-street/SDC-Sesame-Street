/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import ReviewsRatings from './ReviewsRatings.jsx';

function Reviews({ reviews }) {
  console.log('class: ', reviews);

  return (
    <div style={reviewsContainer}>

      {reviews.map((review) => {
        const summ = review.summary;
        return (
          <div key={review.review_id}>
            <ReviewsRatings rating={review.rating} />
            <br />
            {summ.length > 10 ? (
              <span style={summaryContainer}>
                {`${summ.slice(0, 11)}...`}
                <p style={bodyContainer}>
                  {`...${summ.slice(11)}`}
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
