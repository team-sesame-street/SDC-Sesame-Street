import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import Outfit from './Outfit.jsx';
import RelatedItems from './RelatedItems.jsx';

function Main({ id }) {
  const [relatedItems, setRelatedItems] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      }).then((res) => setRelatedItems(res.data));
    }
  }, [id]);

  const slides = [
    { url: 'https://picsum.photos/200/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/400/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/300/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/100/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/500/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/700/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/800/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/900/300', title: 'test test test', description: 'more testing' },
    { url: 'https://picsum.photos/200/300', title: 'test test test', description: 'more testing' },
  ];

  // const getAllPhotos = () => {
  //   for (let x = 0; x < relatedItems.length; x++) {
  //     const infoObj = {};
  //     useEffect(() => {
  //       axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedItems[x]}`, {
  //         headers: {
  //           Authorization: process.env.GITKEY,
  //         },
  //       }).then((res) => {
  //         console.log(itemInfo)
  //         const imageURL = res.results[0].photos[0].thumbnail_url;
  //         const salePrice = res.results[0].sale_price;
  //         const originalPrice = res.results[0].original_price;
  //         infoObj.image = imageURL;
  //         infoObj.salesPrice = salePrice;
  //         infoObj.price = originalPrice;
  //         setItemInfo([...itemInfo, infoObj]);
  //       });
  //     }, [id]);
  //   }
  // };
  // getAllPhotos()
  return (
    <div>
      <div style={style}>
        <Outfit slides={slides} />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div style={style}>
        <RelatedItems slides={slides} />
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
