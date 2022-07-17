import React from 'react';
import FormModal from './FormModal.jsx';

function ReviewsNewReview( {showModal, setShowModal }) {
  function handleClick() {
    setShowModal(true);
  }

  return (
    <div>
      <div className="new-review">
        <button type="button" style={newReviewBtnStyling} onClick={handleClick}>ADD REVIEW</button>
      </div>
      {showModal && <FormModal setShowModal={setShowModal} />}
    </div>
  );
}

const newReviewBtnStyling = {
  cursor: 'pointer',
};

export default ReviewsNewReview;
