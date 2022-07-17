/* eslint-disable react/prop-types */
import React from 'react';
import FormModal from './FormModal.jsx';

function ReviewsNewReview({ showModal, onOpen, onClose }) {
  const addReviewBtn = {
    cursor: 'pointer',
  };

  return (
    <div>
      <div className="new-review">
        <button type="button" style={addReviewBtn} onClick={onOpen}>ADD REVIEW</button>
      </div>
      <FormModal
        showModal={showModal}
        onClose={onClose}
      />
    </div>
  );
}

export default ReviewsNewReview;
