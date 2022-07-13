/* eslint-disable react/prop-types */
import React from 'react';

function ReviewsMoreReviews({ count, setCount, totalReviews }) {
  return (
    <div className="more-reviews">
      {totalReviews > 2 && (
        <button type="button" onClick={() => { setCount(count + 2); }}>MORE REVIEWS</button>
      )}
    </div>
  );
}

export default ReviewsMoreReviews;
