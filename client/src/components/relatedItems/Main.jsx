/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Outfit from './Outfit.jsx';
import RelatedItems from './RelatedItems.jsx';

function Main({ id }) {
  const [relatedItems, setRelatedItems] = useState([]);
  const [itemsInfo, setItemInfo] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      }).then((res) => setRelatedItems(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);


  const slides = [
    { url: 'https://picsum.photos/600/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/400/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/300/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/100/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/500/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/700/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/800/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/900/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/200/300', title: 'test test test', description: 'more testing' },
  ];

  const styleEndpoints = [];
  for (let x = 0; x < relatedItems.length; x++) {
    styleEndpoints.push(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedItems[x]}/styles`);
  }

  const prodEndpoints = [];
  for (let x = 0; x < relatedItems.length; x++) {
    prodEndpoints.push(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedItems[x]}`);
  }

  useEffect(() => {
    axios.all(styleEndpoints.map((endpoint) => axios.get(endpoint, {
      headers: { Authorization: process.env.GITKEY },
    })))
      .then((data) => {
        const results = [];
        for (let x = 0; x < data.length; x++) {
          const obj = {};
          const url = data[x].data.results[0].photos[0].thumbnail_url;
          let salePrice;
          !data[x].data.results[0].sale_price
            ? salePrice = false
            : salePrice = data[x].data.results[0].sale_price;
          obj.salePrice = salePrice;
          obj.url = url;
          results.push(obj);
        }
        setItemInfo(results);
      })
      .catch((err) => console.log(err));
  }, [relatedItems]);

  useEffect(() => {
    axios.all(prodEndpoints.map((endpoint) => axios.get(endpoint, {
      headers: { Authorization: process.env.GITKEY },
    })))
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }, [relatedItems]);

  return (
    <div>
      <div style={style}>
        <RelatedItems slides={itemsInfo} slidesInfo={items} />
      </div>
      <br />
      <br />
      <br />
      <div style={style}>
        <Outfit slides={slides} />
      </div>
    </div>
  );
}

const style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: '#e4e4e4',
};

export default Main;
