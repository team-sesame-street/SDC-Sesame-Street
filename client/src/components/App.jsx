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
  // 40344

  // useEffect(() => {
  //   axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
  //     headers: {
  //       Authorization: process.env.GITKEY,
  //     },
  //   })
  //     .then((res) => setProductId(res.data[2].id))
  //     .catch((err) => alert(err));
  // }, []);

  const pageChange = (id) => {
    setProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* {productId} */}
      <MainOverview id={productId} />
      <MainCarousel id={productId} pageChange={pageChange} />
      <QaBox id={productId} setProductId={setProductId} />
      <RrBox id={productId} />
    </div>
  );
}

export default App;
