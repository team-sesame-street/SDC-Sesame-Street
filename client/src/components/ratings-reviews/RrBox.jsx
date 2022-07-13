/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Reviews from './reviews/index.jsx';
import Ratings from './ratings/Ratings.jsx';

function RrBox({ id }) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(10);
  const [sort, setSort] = useState('relevant');

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
      })
      .catch((err) => console.log('Error RrBox: ', err));
  }, [id, sort]);

  return (
    <div>
      <h1>Ratings & Reviews</h1>
      <Ratings id={id} />
      <Reviews reviews={reviews} setSort={setSort} />
    </div>
  );
}

export default RrBox;
