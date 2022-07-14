/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Reviews from './reviews/index.jsx';
import Ratings from './ratings/index.jsx';

function RrBox({ id }) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [meta, setMeta] = useState();
  const [currRating, setRating] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false,
  });

  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', {
      headers: {
        Authorization: process.env.GITKEY,
      },
      params: {
        product_id: id,
        count,
        sort,
      },
    })
      .then((res) => {
        setReviews(res.data.results);
        console.log('rating', res.data.results);
        console.log('actual', currRating);
        const ratingArray = Object.values(currRating);
        const mapped = ratingArray.map((bool, index) => {
          if (bool) {
            return index + 1;
          }
          return false;
        });

        console.log(mapped);
        console.log('Rating Array: ', ratingArray);
      })
      .catch((err) => console.log('Error RrBox: ', err));
  }, [id, sort, count, currRating]);

  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', {
      headers: {
        Authorization: process.env.GITKEY,
      },
      params: {
        product_id: id,
      },
    })
      .then((res) => {
        setMeta(res.data);
      })
      .catch((err) => console.log('Error getting meta data (RrBox): ', err));
  }, [id]);

  return (
    <div className="RrBox-container" style={flexContainer}>
      <div style={ratingsContainer}>
        Ratings & Reviews
        <Ratings meta={meta} currRating={currRating} setRating={setRating} />
      </div>
      <div style={reviewsContainer}>
        <Reviews reviews={reviews} setSort={setSort} count={count} meta={meta} setCount={setCount} />
      </div>
    </div>
  );
}

const flexContainer = {
  display: 'flex',
  margin: '50px auto 50px auto',
  width: '70%',
  gap: '80px',
  alignItems: 'stretch',
};

const ratingsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  fontSize: '20px',
};

const reviewsContainer = {
  flex: 1,
};

export default RrBox;
