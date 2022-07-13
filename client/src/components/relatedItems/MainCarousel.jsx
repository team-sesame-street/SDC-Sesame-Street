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
  const [relatedItemsInfo, setRelatedItemInfo] = useState({info:[], urls:[]});
  const [reviews, setReviews] = useState([]);
  const [outfitSlides, setCurrOutfitSlides] = useState([]);
  const [currentOutfitInfo, setCurrOutfitInfo] = useState({
    info: {},
    styles: {},
  });

  const productInfo = (id) => {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
  }

  const productStyle = (id) => {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
  }

  const productRatings = (id) => {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
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

  let infoPromises = []
  let stylePromises = []
  let ratingPromises = []

  useEffect(() => {
    if (id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      }).then((res) => {
        res.data.forEach(id => {
          const promise1 = Promise.all([productInfo(id)])
          infoPromises.push(promise1)
          const promise2 = Promise.all([productStyle(id)])
          stylePromises.push(promise2)
          const promise3 = Promise.all([productRatings(id)])
          ratingPromises.push(promise3)
        })
        Promise.all(infoPromises).then(data => {
          const results = []
          for (const subArr of data) {
            results.push(subArr[0])
          }
          setRelatedItemInfo((relatedItemsInfo) => ({...relatedItemsInfo, info: results}))
        })
        Promise.all(stylePromises).then(data => {
          const results = [];
          for (let x = 0; x < data.length; x++) {
            const obj = {};
            let url;
            if (data[x][0].data.results[0].photos[0].url) {
              url = data[x][0].data.results[0].photos[0].url;
            } else {
              url = 'https://images.unsplash.com/photo-1515243061678-14fc18b93935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=800';
            }
            let salePrice;
            let originalPrice = data[x][0].data.results[0].original_price
            !data[x][0].data.results[0].sale_price
              ? salePrice = false
              : salePrice = data[x][0].data.results[0].sale_price;
            obj.salePrice = salePrice;
            obj.url = url;
            obj.originalPrice = originalPrice
            results.push(obj);
          }
          setRelatedItemInfo((relatedItemsInfo) => ({...relatedItemsInfo, urls: results}));
        });
        Promise.all(ratingPromises).then(data => {
          const results = []
          for (let x = 0; x < data.length; x++) {
            const obj = {}
            const id = data[x][0].data.product_id;
            let avg = 0
            let count = 0
            for (const rating in data[x][0].data.ratings) {
             avg += parseInt(rating) * parseInt(data[x][0].data.ratings[rating])
             count += parseInt(data[x][0].data.ratings[rating])
            }
            obj.id = id;
            obj.avg = avg / count;
            results.push(obj);
          }
          setReviews(results);
        })
      })
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

  return (
    <div>
      <div style={style}>
        <RelatedItems slides={relatedItemsInfo} id={id} pageChange={pageChange} reviews={reviews} />
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
