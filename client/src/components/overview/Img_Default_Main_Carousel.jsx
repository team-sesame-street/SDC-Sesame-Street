import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

function MainImage({ images, currImgIndex, setCurrImgIndex, thumbnailIndexMin,
  thumbnailIndexMax, setThumbnailIndexMin, setThumbnailIndexMax, setExpandedView }) {
  if (images.length > 0) {
    const navigateLeft = () => {
      if (currImgIndex - 1 < thumbnailIndexMin) {
        setThumbnailIndexMin(thumbnailIndexMin - 1);
        setThumbnailIndexMax(thumbnailIndexMax - 1);
      }
      setCurrImgIndex(currImgIndex - 1);
    };

    const navigateRight = () => {
      if (currImgIndex + 1 > thumbnailIndexMax) {
        setThumbnailIndexMax(thumbnailIndexMax + 1);
        setThumbnailIndexMin(thumbnailIndexMin + 1);
      }
      setCurrImgIndex(currImgIndex + 1);
    };

    // minimal styling to represent smaller version of image
    const styling = {
      height: '500px',
      width: '750px',
      objectFit: 'contain',
      cursor: 'zoom-in',
    };

    return (
      <div>
        <h2>Main Image Carousel</h2>
        {images.map((image, index) => (
          <div key={index}>
            {index === currImgIndex && index > 0
            && (<FaArrowCircleLeft onClick={navigateLeft} />)}
            {index === currImgIndex && (
              <img src={images[currImgIndex].url} style={styling}
                alt="A representation of this product"
                onClick={() => {setExpandedView(true);}}
              />
            )}
            {index === currImgIndex && index < images.length - 1
            && (<FaArrowCircleRight onClick={navigateRight} />)}
          </div>
        ))}
      </div>
    );
  }
}

export default MainImage;
