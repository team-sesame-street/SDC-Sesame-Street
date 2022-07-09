/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QaBox from './questionsAnswers/QaBox.jsx';
import Main from './relatedItems/Main.jsx';
import MainOverview from './overview/MainOverview.jsx';

function App() {
  const [productId, setProductId] = useState(40346);

  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
      .then((res) => setProductId(res.data[2].id))
      .catch((err) => alert(err));
  }, []);

  return (
    <div>
      {productId}
      <MainOverview id={productId} />
      <Main id={productId} />
      <QaBox id={productId} />
    </div>
  );
}

export default App;
