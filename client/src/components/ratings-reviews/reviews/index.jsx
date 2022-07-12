/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import ReviewsRatings from './ReviewsRatings.jsx';
import ReviewsDate from './ReviewsDate.jsx';
import ReviewsUser from './ReviewsUser.jsx';
import ReviewsRecommend from './ReviewsRecommend.jsx';
import ReviewsResponse from './ReviewsResponse.jsx';
import ReviewsBody from './ReviewsBody.jsx';

function Reviews({ reviews }) {
  console.log('class: ', reviews);

  return (
    <div style={reviewsContainer}>
      {reviews.map((review) => {
        const revSumm = review.summary;
        return (
          <div key={review.review_id}>
            <span style={flexSpan}>
              <ReviewsRatings rating={review.rating} />
              <ReviewsUser user={review.reviewer_name} />
              <ReviewsDate date={review.date} />
              <br />
            </span>
            {revSumm.length > 60 ? (
              <span style={summaryContainer}>
                {`${revSumm.slice(0, 61)}...`}
                <span style={bodyContainer}>
                  {`...${revSumm.slice(61)}`}
                  <br />
                </span>
              </span>
            ) : (
              <span style={summaryContainer}>
                {revSumm}
              </span>
            )}
            <span>
              <br />
              <ReviewsBody reviewBody={review.body} reviewImages={review.photos} />
            </span>
            <ReviewsRecommend recommend={review.recommend} />
            <ReviewsResponse responseBody={review.response} />
          </div>
        );
      })}
    </div>
  );
}

const flexSpan = {
  display: 'flex',
};

const reviewsContainer = {

};

const summaryContainer = {
  fontWeight: 'bold',
};

const bodyContainer = {
  fontWeight: 'normal',
};

export default Reviews;
