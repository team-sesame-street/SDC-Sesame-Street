/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Outfit from './Outfit.jsx';
import RelatedItems from './RelatedItems.jsx';

const style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

function MainCarousel({ id, pageChange }) {
  const [relatedItems, setRelatedItems] = useState([]);
  const [relatedItemsInfo, setRelatedItemInfo] = useState({info:[], urls:[]});
  // const [itemsUrls, setItemUrls] = useState([]);
  const [outfitSlides, setCurrOutfitSlides] = useState([]);
  const [currentOutfitInfo, setCurrOutfitInfo] = useState({
    info: {},
    styles: {},
  });

  const styleEndpoints = [];
  for (let x = 0; x < relatedItems.length; x++) {
    styleEndpoints.push(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedItems[x]}/styles`);
  }

  const prodEndpoints = [];
  for (let x = 0; x < relatedItems.length; x++) {
    prodEndpoints.push(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedItems[x]}`);
  }

  const addOutfit = (newOutfit) => {
    setCurrOutfitSlides([...outfitSlides, newOutfit]);
  };

  const deleteOutfit = (id) => {
    const copy = [...outfitSlides];
    for (let x = 0; x < copy.length; x++) {
      if (copy[x].id === id) {
        copy.splice(x, 1);
        x--;
      }
    }
    setCurrOutfitSlides(copy);
  };

  useEffect(() => {
    if (id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      }).then((res) => setRelatedItems(res.data))
        .catch((err) => console.log(err));
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      }).then((res) => {
        setCurrOutfitInfo((currentOutfitInfo) => ({ ...currentOutfitInfo, info: res.data }));
      })
        .catch((err) => console.log(err));

      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      }).then((res) => {
        setCurrOutfitInfo((currentOutfitInfo) => ({ ...currentOutfitInfo, styles: res.data.results[0] }));
      })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    axios.all(styleEndpoints.map((endpoint) => axios.get(endpoint, {
      headers: { Authorization: process.env.GITKEY },
    })))
      .then((data) => {
        const results = [];
        for (let x = 0; x < data.length; x++) {
          const obj = {};
          let url;
          if (data[x].data.results[0].photos[0].url) {
            url = data[x].data.results[0].photos[0].url;
          } else {
            url = 'https://images.unsplash.com/photo-1515243061678-14fc18b93935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=800';
          }
          let salePrice;
          !data[x].data.results[0].sale_price
            ? salePrice = false
            : salePrice = data[x].data.results[0].sale_price;
          obj.salePrice = salePrice;
          obj.url = url;
          results.push(obj);
        }
        setRelatedItemInfo((relatedItemsInfo) => ({...relatedItemsInfo, urls: results}));
      })
      .catch((err) => console.log(err));

    axios.all(prodEndpoints.map((endpoint) => axios.get(endpoint, {
      headers: { Authorization: process.env.GITKEY },
    })))
      .then((data) => setRelatedItemInfo((relatedItemsInfo) => ({...relatedItemsInfo, info: data})))
      .catch((err) => console.log(err));
  }, [relatedItems]);
  return (
    <div>
      <div style={style}>
        <RelatedItems slides={relatedItemsInfo} id={id} pageChange={pageChange} />
      </div>
      <br />
      <br />
      <br />
      <div style={style}>
        <Outfit currOutfit={currentOutfitInfo} deleteOutfit={deleteOutfit} outfitSlides={outfitSlides} addOutfit={addOutfit} />
      </div>
    </div>
  );
}

export default MainCarousel;
