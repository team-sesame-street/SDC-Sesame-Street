/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { product1 } from '../../overview/MainOverview.jsx';

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
          <h2>About the {product}</h2>
          <br />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Overall Rating*
            <input type="text" />
            <br />
            Do You Recommend This Product?*
            <input type="text" />
            <br />
            Characteristics *
            <input type="text" />
            <br />
          </label>
          <input type="button" value="Cancel" onClick={onClose} style={cancelReviewBtn} />
          <input type="submit" style={submitReviewBtn} value="Submit" />
        </form>
      </div>
    </>
  );
}
