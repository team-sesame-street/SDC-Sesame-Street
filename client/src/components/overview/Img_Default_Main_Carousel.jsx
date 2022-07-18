import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import ImageDefaultThumbnail from './Img_Default_Thumbnails.jsx';

const leftArrowStyle = {
  position: 'absolute',
  zIndex: 70,
  height: '3vh',
  width: '3vh',
  minHeight: '20px',
  minWidth: '20px',
  gridColumn: '3 / 5',
  gridRow: '5 / 6',
  cursor: 'pointer',
};

const rightArrowStyle = {
  position: 'absolute',
  zIndex: 70,
  height: '3vh',
  width: '3vh',
  minHeight: '20px',
  minWidth: '20px',
  gridColumn: '13 / 15',
  gridRow: '5 / 6',
  cursor: 'pointer',
};

function MainImage(
  {
    images, currImgIndex, setCurrImgIndex, thumbnailIndexMin,
    thumbnailIndexMax, setThumbnailIndexMin, setThumbnailIndexMax, setExpandedView,
  },
) {
  if (images.length > 0) {
    console.log(images.length);
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

    return (
      <div>
        {images.map((image, index) => (
          <div key={index}>
            {index === currImgIndex && (
              <SubWrapper>
                <ImageDefaultThumbnail
                  images={images}
                  currImgIndex={currImgIndex}
                  setCurrImgIndex={setCurrImgIndex}
                  thumbnailIndexMin={thumbnailIndexMin}
                  thumbnailIndexMax={thumbnailIndexMax}
                  setThumbnailIndexMin={setThumbnailIndexMin}
                  setThumbnailIndexMax={setThumbnailIndexMax}
                />
                {index > 0 && (
                  <FaArrowCircleLeft
                    data-testid="left-arrow"
                    onClick={navigateLeft}
                    style={leftArrowStyle}
                  />
                )}
                <Image
                  src={images[currImgIndex].url}
                  alt="A representation of this product"
                  onClick={() => { setExpandedView(true); }}
                  loading="lazy"
                />
                {index < images.length - 1 && (
                  <FaArrowCircleRight
                    style={rightArrowStyle}
                    data-testid="right-arrow"
                    onClick={navigateRight}
                  />
                )}
              </SubWrapper>
            )}
          </div>
        ))}
      </div>
    );
  }
}

MainImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  currImgIndex: PropTypes.number,
  setCurrImgIndex: PropTypes.func.isRequired,
  thumbnailIndexMin: PropTypes.number,
  thumbnailIndexMax: PropTypes.number,
  setThumbnailIndexMin: PropTypes.func.isRequired,
  setThumbnailIndexMax: PropTypes.func.isRequired,
  setExpandedView: PropTypes.func.isRequired,
};

MainImage.defaultProps = {
  currImgIndex: null,
  thumbnailIndexMax: null,
  thumbnailIndexMin: null,
};

export default MainImage;

const SubWrapper = styled.div`
  background-color: #F8F7F2;
  position: relative;
  isolation: isolate;
  display: grid;
  height: 39vw; // originally 60vh here
  width: 50vw;
  min-height: 390px;
  min-width: 510px;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(8, 1fr);
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
`;

const Image = styled.img`
  position: absolute;
  z-index: 50;
  grid-row: 1 / 9;
  grid-column: 3 / 15;
  height: 100%;
  width: 100%;
  object-fit: contain;
  cursor: zoom-in;
`;
