/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';

function ReviewsMoreReviews({ count, setCount, totalReviews }) {
  return (
    <div className="more-reviews">
      {(totalReviews > 2 && count < totalReviews) && (
        <button type="button" style={moreReviewsBtnStyling} onClick={() => { setCount(count + 2); }}>MORE REVIEWS</button>
      )}
    </div>
  );
}

const moreReviewsBtnStyling = {
  cursor: 'pointer',
  marginBottom: '20%',
};

export default ReviewsMoreReviews;
