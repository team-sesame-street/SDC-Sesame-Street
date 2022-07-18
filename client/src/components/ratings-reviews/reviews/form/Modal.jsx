/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Rating from './Rating.jsx';
import Characteristics from './Characteristics.jsx';

const styles = {
  modalContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%',
    backgroundColor: '#fff',
    padding: '50px',
    height: '75%',
    width: '50%',
    zIndex: 1000,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7',
    zIndex: 1000,
  },
  modalItems: {
    overflow: 'scroll',
    maxWidth: '100%',
    maxHeight: '40vh',
    padding: '2rem',
  },
  xReviewBtn: {
    marginTop: '2px',
    marginRight: '2px',
    position: 'absolute',
    top: '0',
    right: '0',
    cursor: 'pointer',
  },
  cancelReviewBtn: {
    cursor: 'pointer',
  },
  submitReviewBtn: {
    cursor: 'pointer',
  },
};

export default function Modal({ showModal, onClose }) {
  if (!showModal) return null;

  const [starRating, setStarRating] = useState();
  const [recommendProduct, setRecommendProduct] = useState();
  const [descriptionRate, setDescriptionRate] = useState({
    Comfort: null,
    Fit: null,
    Length: null,
    Size: null,
    Quality: null,
    Width: null,
  });

  const ratingType = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, [showModal]);

  return (
    <>
      <div style={styles.modalOverlay} />
      <div style={styles.modalContainer}>
        <form>
          <button type="button" onClick={onClose} style={styles.xReviewBtn}>X</button>
          <br />
          <h1>Write Your Review</h1>
          <br />
          <h2>
            {`About the ${localStorage.getItem('productName')}`}
          </h2>
          <br />
          <div style={styles.modalItems}>
            <b>Overall Rating</b>
            *
            <br />
            <Rating
              starRating={starRating}
              changeRating={(userRating) => setStarRating(userRating)}
            />
            {' '}
            {ratingType[starRating - 1]}
            <br />
            <b>Do You Recommend This Product?</b>
            *
            <br />
            <label>
              <input
                type="radio"
                value="yes"
                checked={recommendProduct === 'yes'}
                onChange={() => { setRecommendProduct('yes'); }}
              />
              {' '}
              Yes
            </label>
            {' '}
            <label>
              <input
                type="radio"
                value="no"
                checked={recommendProduct === 'no'}
                onChange={() => { setRecommendProduct('no'); }}
              />
              {' '}
              No
            </label>
            <br />
            <b>Characteristics</b>
            *
            <Characteristics
              descriptionRate={descriptionRate}
              setDescriptionRate={(value) => { setDescriptionRate(value); }}
            />
          </div>
          <br />
          <input type="button" value="Cancel" onClick={onClose} style={styles.cancelReviewBtn} />
          <input type="submit" style={styles.submitReviewBtn} value="Submit" />

        </form>
      </div>
    </>
  );
}
