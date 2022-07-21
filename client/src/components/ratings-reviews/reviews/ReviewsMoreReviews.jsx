/* eslint-disable react/prop-types */
import React from 'react';

const styles = {
  moreReviewsBtnStyling: {
    cursor: 'pointer',
    marginBottom: '20%',
  },
};

export default function ReviewsMoreReviews({ count, setCount, totalReviews }) {
  return (
    <div className="more-reviews">
      {(totalReviews > 2 && count < totalReviews) && (
        <button type="button" style={styles.moreReviewsBtnStyling} onClick={() => { setCount(count + 2); }}>MORE REVIEWS</button>
      )}
    </div>
  );
}
