/* eslint-disable react/prop-types */
import React from 'react';
import Modal from './form/Modal.jsx';
import Button from '../../../../utils/Button.jsx';

export default function ReviewsNewReview({
  closeModal, showModal, onOpen, onClose,
}) {
  const addReviewBtn = {
    cursor: 'pointer',
  };

  return (
    <div>
      <div className="new-review">
        <Button type="button" style={addReviewBtn} onClick={onOpen}>ADD REVIEW</Button>
      </div>
      <Modal
        closeModal={() => { closeModal(); }}
        showModal={showModal}
        onClose={onClose}
      />
    </div>
  );
}
