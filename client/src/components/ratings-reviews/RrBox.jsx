/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Reviews from './reviews/index.jsx';
import Ratings from './ratings/Ratings.jsx';

function RrBox({ id }) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [meta, setMeta] = useState();

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
  }, [id, sort, count]);

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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
      <h1>Ratings & Reviews</h1>
      <Ratings id={id} />
      <Reviews reviews={reviews} setSort={setSort} count={count} setCount={setCount} meta={meta} />
    </div>
  );
}

export default RrBox;
