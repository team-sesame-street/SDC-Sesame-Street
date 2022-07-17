/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import FormRating from './FormRating.jsx';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%',
  backgroundColor: '#fff',
  padding: '50px',
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7',
  zIndex: 1000,
};

const X_REVIEW_BTN = {
  marginTop: '2px',
  marginRight: '2px',
  position: 'absolute',
  top: '0',
  right: '0',
  cursor: 'pointer',
};

const cancelReviewBtn = {
  cursor: 'pointer',
};

const submitReviewBtn = {
  cursor: 'pointer',
};

export default function FormModal({ showModal, onClose }) {
  if (!showModal) return null;

  const [starRating, setStarRating] = useState();
  const [recommendProduct, setRecommendProduct] = useState();

  const ratingType = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, [showModal]);

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <form>
          <button type="button" onClick={onClose} style={X_REVIEW_BTN}>X</button>
          <br />
          <h1>Write Your Review</h1>
          <br />
          <h2>
            {`About the ${localStorage.getItem('productName')}`}
          </h2>
          <br />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Overall Rating*</label>
          <FormRating starRating={starRating} changeRating={(rating) => setStarRating(rating)} />
          {ratingType[starRating - 1]}
          <br />
          Do You Recommend This Product?*
          <label>
            <input
              type="radio"
              value="yes"
              checked={recommendProduct === 'yes'}
              onChange={() => { setRecommendProduct('yes'); }}
            />
            yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={recommendProduct === 'no'}
              onChange={() => { setRecommendProduct('no'); }}
            />
            no
          </label>
          <br />
          Characteristics *
          <input type="text" />
          <br />
          <input type="button" value="Cancel" onClick={onClose} style={cancelReviewBtn} />
          <input type="submit" style={submitReviewBtn} value="Submit" />
        </form>
      </div>
    </>
  );
}
