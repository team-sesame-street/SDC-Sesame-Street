import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import ImageDefaultThumbnail from './Img_Default_Thumbnails.jsx';
import MainImage from './Img_Default_Main_Carousel.jsx';

function MainOverview({id}) {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});
  const [images, setImages] = useState([]);
  const [currImgIndex, setCurrImgIndex] = useState(null);

  useEffect(() => {
    if (id) {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
        method: 'get',
        headers: {
          Authorization: process.env.GITKEY,
          responseType: 'json',
        },
      })
        .then((response) => {
          const stylesData = response.data.results;
          setStyles(stylesData);
          stylesData.forEach((style) => {
            if (style['default?']) {
              setSelectedStyle(style);
              setImages(style.photos);
              setCurrImgIndex(0);
            }
          });
        })
        .catch((err) => {
          console.log('Client: Unable to retrieve styles for this product');
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(selectedStyle).length > 0) {
      setImages(selectedStyle.photos);
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (images.length > 0) {
      if (currImgIndex === null) {
        setCurrImgIndex(0);
      }
    }
  }, [images]);

  return (
    <div>
      <h1>Overview</h1>
      <StyleSelector
        styles={styles}
        selectedStyleId={selectedStyle.style_id}
        setSelectedStyle={setSelectedStyle}
      />
      <ImageDefaultThumbnail
        images={images}
        currImgIndex={currImgIndex}
        setCurrImgIndex={setCurrImgIndex}
      />
      <MainImage
        images={images}
        currImgIndex={currImgIndex}
        setCurrImgIndex={setCurrImgIndex}
      />
    </div>
  );
}

export default MainOverview;
