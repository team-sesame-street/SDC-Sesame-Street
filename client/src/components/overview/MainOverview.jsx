import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import ImageDefaultThumbnail from './Img_Default_Thumbnails.jsx';
import MainImage from './Img_Default_Main_Carousel.jsx';

function MainOverview({ id }) {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});
  const [images, setImages] = useState([]);
  const [thumbnailIndexMin, setThumbnailIndexMin] = useState(null);
  const [thumbnailIndexMax, setThumbnailIndexMax] = useState(null);
  const [currImgIndex, setCurrImgIndex] = useState(null);

  useEffect(() => {
    if (id) {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
        method: 'get',
        headers: {
          Authorization: process.env.GITKEY,
        },
        responseType: 'json',
      })
        .then((response) => {
          const stylesData = response.data.results;
          setStyles(stylesData);
          stylesData.forEach((style) => {
            if (style['default?']) {
              setSelectedStyle(style);
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
      // dummy images data is duplicate of the same photos set
      setImages(selectedStyle.photos.concat(selectedStyle.photos));
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (images.length > 0) {
      if (currImgIndex === null) {
        setCurrImgIndex(0);
      }
      if (thumbnailIndexMin === null) {
        setThumbnailIndexMin(0);
      }
      if (thumbnailIndexMax === null) {
        if (images.length >= 7) {
          setThumbnailIndexMax(6);
        } else {
          setThumbnailIndexMax(images.length - 1);
        }
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
        thumbnailIndexMin={thumbnailIndexMin}
        thumbnailIndexMax={thumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setThumbnailIndexMax={setThumbnailIndexMax}
      />
      <MainImage
        images={images}
        currImgIndex={currImgIndex}
        setCurrImgIndex={setCurrImgIndex}
        thumbnailIndexMin={thumbnailIndexMin}
        thumbnailIndexMax={thumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setThumbnailIndexMax={setThumbnailIndexMax}
      />
    </div>
  );
}

export default MainOverview;
