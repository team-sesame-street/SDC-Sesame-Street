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
  const [filterRatings, setFilterRatings] = useState();

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
        const reviewsData = res.data.results;
        const ratingArray = Object.values(currRating);
        const mapped = ratingArray.flatMap((bool, index) => {
          if (bool) {
            return index + 1;
          }
          return [];
        });
        if (mapped.length === 0) {
          setReviews(reviewsData);
        } else {
          const ratingMatch = reviewsData.filter((r) => mapped.indexOf(r.rating) !== -1);
          setReviews(ratingMatch);
        }
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
        const metaData = res.data;
        const ratingArray = Object.values(currRating);
        const mapped = ratingArray.flatMap((bool, index) => {
          if (bool) {
            return index + 1;
          }
          return [];
        });
        if (mapped.length === 0) {
          setMeta(metaData);
          setFilterRatings();
        } else {
          const ratingsValues = Object.values(metaData.ratings);
          const newRatingsData = {};
          for (let i = 0; i < mapped.length; i += 1) {
            const key = mapped[i];
            newRatingsData[key] = ratingsValues[key - 1];
          }
          setFilterRatings(newRatingsData);
          setMeta(metaData);
        }
      })
      .catch((err) => console.log('Error getting meta data (RrBox): ', err));
  }, [id, currRating]);

  return (
    <div className="RrBox-container" style={flexContainer}>
      <div style={ratingsContainer}>
        Ratings & Reviews
        <Ratings meta={meta} currRating={currRating} setRating={setRating} filterRatings={filterRatings} />
      </div>
      <div style={reviewsContainer}>
        <Reviews reviews={reviews} setSort={setSort} count={count} meta={meta} setCount={setCount} filterRatings={filterRatings} />
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
