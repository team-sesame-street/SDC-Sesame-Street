import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import MainImage from './Img_Default_Main_Carousel.jsx';
import ProductInfo from './ProductInfo.jsx';
import Checkout from './Checkout.jsx';
import ExpandedImage from './Img_Expanded.jsx';
import Text from './Text.jsx';

function MainOverview({ id }) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});
  const [images, setImages] = useState([]);
  const [thumbnailIndexMin, setThumbnailIndexMin] = useState(null);
  const [thumbnailIndexMax, setThumbnailIndexMax] = useState(null);
  const [currImgIndex, setCurrImgIndex] = useState(null);
  const [expandedView, setExpandedView] = useState(false);
  // NOTES: ID 40345 is the a product with no available sizes

  useEffect(() => {
    if (id) {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
        method: 'get',
        headers: {
          Authorization: process.env.GITKEY,
        },
        responseType: 'json',
      })
        .then((response) => {
          setProduct(response.data);
        })
        .catch((err) => {
          console.log(err);
          alert('Unable to retrieve information regarding this product');
        });
    }
  }, [id]);

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
          if (stylesData.every((style) => !style['default?'])) {
            setSelectedStyle(stylesData[0]);
          }
        })
        .catch(() => {
          alert('Unable to retrieve styles for this product');
        });
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(selectedStyle).length > 0) {
      // dummy images data is duplicate of the same photos set
      setImages(selectedStyle.photos.concat(selectedStyle.photos));
      // setImages(selectedStyle.photos);
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
      if (currImgIndex && !selectedStyle.photos[currImgIndex]) {
        setCurrImgIndex(selectedStyle.photos.length - 1);
        setThumbnailIndexMax(selectedStyle.photos.length - 1);
        if (images.length >= 7) {
          setThumbnailIndexMin(selectedStyle.photos.length - 7);
        } else {
          setThumbnailIndexMin(0);
        }
      }

    }
  }, [images]);

  return (
    <div>
      {expandedView && (
        <ExpandedImage
          images={images}
          currImgIndex={currImgIndex}
          setCurrImgIndex={setCurrImgIndex}
          setExpandedView={setExpandedView}
        />
      )}
      {!expandedView && (
        <div>
          <ProductInfo product={product} selectedStyle={selectedStyle} />
          <StyleSelector
            styles={styles}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
          />
          <MainImage
            images={images}
            currImgIndex={currImgIndex}
            setCurrImgIndex={setCurrImgIndex}
            thumbnailIndexMin={thumbnailIndexMin}
            thumbnailIndexMax={thumbnailIndexMax}
            setThumbnailIndexMin={setThumbnailIndexMin}
            setThumbnailIndexMax={setThumbnailIndexMax}
            setExpandedView={setExpandedView}
          />
          <Checkout
            selectedStyle={selectedStyle}
          />
          <Text product={product} />
        </div>
      )}
    </div>
  );
}

MainOverview.propTypes = {
  id: PropTypes.number,
};

MainOverview.defaultProps = {
  id: undefined,
};

export default MainOverview;
