/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QaBox from './questionsAnswers/QaBox.jsx';
import RrBox from './ratings-reviews/RrBox.jsx';
import MainCarousel from './relatedItems/MainCarousel.jsx';
import MainOverview from './overview/MainOverview.jsx';
import Navbar from '../../utils/Navbar.jsx';
import styled from 'styled-components';
import Button from '../../utils/Button.jsx';

function App() {
  const [productId, setProductId] = useState(40346);
  const [currProduct, setCurrProduct] = useState({ id: productId });
  const [totalRatings, setTotalRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const ratingsReviewsNode = useRef(null);

  useEffect(() => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
      .then(({ data }) => {
        localStorage.setItem('productName', data.name);
        setCurrProduct(data);
      })
      .catch((err) => console.error(err));
  }, [productId]);

  const pageChange = (id) => {
    setProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <MainOverview
          id={productId}
          totalRatings={totalRatings}
          avgRating={avgRating}
          ratingsReviewsNode={ratingsReviewsNode}
        />
        {/* {productId} */}
        <MainCarousel id={productId} pageChange={pageChange} />
        <QaBox currProduct={currProduct} />
        <RrBox
          ratingsReviewsNode={ratingsReviewsNode}
          productId={productId}
          setTotalRatings={(num) => { setTotalRatings(num); }}
          setAvgRating={(num) => { setAvgRating(num); }}
        />
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
