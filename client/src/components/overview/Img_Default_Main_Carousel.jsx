import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

function MainImage({images, currImgIndex, setCurrImgIndex}) {
  if (images.length > 0) {
    return (
      <div>
        <h2>Main Image Carousel</h2>
        {images.map((image, index) => (
          <div key={index}>
            {index === currImgIndex && index > 0
            && (<FaArrowCircleLeft onClick={() => { setCurrImgIndex(currImgIndex - 1); }} />)}
            {index === currImgIndex && (
              <img src={images[currImgIndex].url} alt="A representation of this product" style={{ cursor: 'zoom-in' }} />
            )}
            {index === currImgIndex && index < images.length - 1
            && (<FaArrowCircleRight onClick={() => { setCurrImgIndex(currImgIndex + 1); }} />)}
          </div>
        ))}
      </div>
    );
  }
}

export default MainImage;
