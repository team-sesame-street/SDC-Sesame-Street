/* eslint-disable react/prop-types */
import React from 'react';

function ReviewsMoreReviews({ count, setCount }) {
  return (
    <div className="more-reviews">
      <button type="button" onClick={() => { setCount(count + 2); }}>MORE REVIEWS</button>
    </div>
  );
}

export default ReviewsMoreReviews;
