/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QaBox from './questionsAnswers/QaBox.jsx';
import RrBox from './ratings-reviews/RrBox.jsx';
import MainCarousel from './relatedItems/MainCarousel.jsx';
import MainOverview from './overview/MainOverview.jsx';

function App() {
  const [productId, setProductId] = useState(40346);
  const [currProduct, setCurrProduct] = useState({ id: productId });

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
    <div>
      {productId}
      <MainOverview id={productId} />
      <MainCarousel id={productId} pageChange={pageChange} />
      <QaBox currProduct={currProduct} />
      <RrBox id={productId} />
    </div>
  );
}

export default App;
