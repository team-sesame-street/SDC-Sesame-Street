/* eslint-disable react/prop-types */
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
import ReviewsNewReview from './ReviewsNewReview.jsx';

const styles = {
  reviewsContainer: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  reviewsSubContainer: {
    maxHeight: '100vh',
    overflowY: 'auto',
    wordBreak: 'break-all',
    marginBottom: '20px',
  },

  individualReview: {
    borderBottomStyle: 'solid',
    marginTop: '40px',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  buttonStyle: {
    display: 'flex',
    justifyContent: 'center',
  },

  sortedStyle: {
    display: 'flex',
    marginBottom: '25px',
    fontSize: 20,
    fontWeight: 'bold',
  },

  summaryContainer: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  bodyContainer: {
    fontWeight: 'normal',
  },
};

export default function Reviews({
  reviews, setSort, count, setCount, meta, filterRatings, showModal, setShowModal,
}) {
  let totalReviews;
  if (meta) {
    if (filterRatings) {
      totalReviews = getTotalRatings(filterRatings);
      setCount(totalReviews);
    } else {
      totalReviews = getTotalRatings(meta.ratings);
    }
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  }

  function onKeyDown(event) {
    if (event.keyCode === 27) {
      closeModal();
    }
  }

  return (
    <div style={styles.reviewsContainer}>
      <div style={styles.sortedStyle}>
        {totalReviews}
        {' '}
        reviews, sorted by
        {' '}
        <ReviewsSort setSort={setSort} />
      </div>
      <div style={styles.reviewsSubContainer}>
        {reviews.map((review) => {
          const revSumm = review.summary;
          return (
            <div key={review.review_id} style={styles.individualReview}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ReviewsRatings rating={review.rating} />
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                  <ReviewsUser user={review.reviewer_name} />
                  <ReviewsDate date={review.date} />
                </div>
              </div>
              <br />
              {revSumm.length > 60 ? (
                <div style={styles.summaryContainer}>
                  {`${revSumm.slice(0, 61)}...`}
                  <div style={styles.bodyContainer}>
                    {`...${revSumm.slice(61)}`}
                    <br />
                  </div>
                </div>
              ) : (
                <div style={styles.summaryContainer}>
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
      <div style={styles.buttonContainer}>
        <div style={styles.buttonStyle}>
          <ReviewsMoreReviews count={count} setCount={setCount} totalReviews={totalReviews} />
        </div>
        <div onKeyDown={(event) => onKeyDown(event)} role="button" tabIndex="0">
          <ReviewsNewReview
            showModal={showModal}
            closeModal={() => { closeModal(); }}
            onOpen={() => { openModal(); }}
            onClose={() => { closeModal(); }}
          />
        </div>
      </div>
    </div>
  );
}
