/* eslint-disable react/prop-types */
import React from 'react';
import Modal from './form/Modal.jsx';

function ReviewsNewReview({ closeModal, showModal, onOpen, onClose }) {
  const addReviewBtn = {
    cursor: 'pointer',
  };

  return (
    <div>
      <div className="new-review">
        <button type="button" style={addReviewBtn} onClick={onOpen}>ADD REVIEW</button>
      </div>
      <Modal
        closeModal={() => { closeModal(); }}
        showModal={showModal}
        onClose={onClose}
      />
    </div>
  );
}

export default ReviewsNewReview;
