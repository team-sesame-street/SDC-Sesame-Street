/* eslint-disable no-console */
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
import ReviewsHelpful from './ReviewsHelpful.jsx';
import ReviewsSort from './ReviewsSort.jsx';
import ReviewsMoreReviews from './ReviewsMoreReviews.jsx';
import getTotalRatings from '../../../../utils/getTotalRatings.js';

function Reviews({ reviews, setSort, count, setCount, meta, filterRatings }) {
  let totalReviews;
  if (meta) {
    if (filterRatings) {
      totalReviews = getTotalRatings(filterRatings);
      setCount(totalReviews);
    } else {
      totalReviews = getTotalRatings(meta.ratings);
    }
  }

  return (
    <div style={reviewsContainer}>
      <div style={sortedStyle}>
        {totalReviews}
        {' '}
        reviews, sorted by
        {' '}
        <ReviewsSort setSort={setSort} />
      </div>
      <div style={reviewsSubContainer}>
        {reviews.map((review) => {
          const revSumm = review.summary;
          return (
            <div key={review.review_id} style={individualReview}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ReviewsRatings rating={review.rating} />
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                  <ReviewsUser user={review.reviewer_name} />
                  <ReviewsDate date={review.date} />
                </div>
              </div>
              <br />
              {revSumm.length > 60 ? (
                <div style={summaryContainer}>
                  {`${revSumm.slice(0, 61)}...`}
                  <div style={bodyContainer}>
                    {`...${revSumm.slice(61)}`}
                    <br />
                  </div>
                </div>
              ) : (
                <div style={summaryContainer}>
                  {revSumm}
                </div>
              )}
              <div>
                <br />
                <ReviewsBody reviewBody={review.body} reviewImages={review.photos} />
                <br />
              </div>
              <ReviewsRecommend recommend={review.recommend} />
              <ReviewsResponse responseBody={review.response} />
              <br />
              <ReviewsHelpful helpfulness={review.helpfulness} reviewId={review.review_id} />
            </div>
          );
        })}
      </div>
      <div style={buttonStyle}>
        <ReviewsMoreReviews count={count} setCount={setCount} totalReviews={totalReviews} />
      </div>
    </div>
  );
}

const reviewsContainer = {
  marginTop: '60px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const reviewsSubContainer = {
  maxHeight: '100vh',
  overflowY: 'auto',
  wordBreak: 'break-all',
  marginBottom: '20px',
};

const individualReview = {
  borderBottomStyle: 'solid',
  marginTop: '40px',
};

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const sortedStyle = {
  display: 'flex',
  marginBottom: '25px',
  fontSize: 20,
  fontWeight: 'bold',
};

const summaryContainer = {
  fontWeight: 'bold',
  fontSize: 20,
};

const bodyContainer = {
  fontWeight: 'normal',
};

export default Reviews;
