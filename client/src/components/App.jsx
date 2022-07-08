/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QaBox from './questionsAnswers/QaBox.jsx';
import Main from './relatedItems/Main.jsx';

function App() {
  const [productId, setProductId] = useState('');

  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
      .then((res) => setProductId(res.data[4].id))
      .catch((err) => alert(err));
  }, []);

  return (
    <div>
      {productId}
      <Main id={productId} />
      <QaBox id={productId} />
    </div>
  );
}

export default App;
