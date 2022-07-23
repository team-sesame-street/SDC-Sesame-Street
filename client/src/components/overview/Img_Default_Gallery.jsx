import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import ImageDefaultThumbnail from './Img_Default_Thumbnails.jsx';

function MainImage(
  {
    images, currImgIndex, setCurrImgIndex, thumbnailIndexMin,
    thumbnailIndexMax, setThumbnailIndexMin, setThumbnailIndexMax, setExpandedView,
  },
) {
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

    return (
      <Wrapper>
        {images.map((image, index) => {
          if (index === currImgIndex) {
            return (
              <SubWrapper key={index}>
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
                    className="arrows-default"
                    data-testid="left-arrow"
                    onClick={navigateLeft}
                    style={{ gridColumn: '3 / 5' }}
                  />
                )}
                <Image
                  data-testid="main-image"
                  src={
                    images[currImgIndex].url
                      ? images[currImgIndex].url
                      : 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2329&q=80'
                    }
                  alt="A representation of this product"
                  onClick={() => { setExpandedView(true); }}
                  loading="lazy"
                />
                {index < images.length - 1 && (
                  <FaArrowCircleRight
                    className="arrows-default"
                    style={{ gridColumn: '13 / 15' }}
                    data-testid="right-arrow"
                    onClick={navigateRight}
                  />
                )}
              </SubWrapper>
            );
          }
          return null;
        })}
      </Wrapper>
    );
  }
  return null;
}

MainImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string,
    url: PropTypes.string,
  })),
  currImgIndex: PropTypes.number,
  setCurrImgIndex: PropTypes.func.isRequired,
  thumbnailIndexMin: PropTypes.number,
  thumbnailIndexMax: PropTypes.number,
  setThumbnailIndexMin: PropTypes.func.isRequired,
  setThumbnailIndexMax: PropTypes.func.isRequired,
  setExpandedView: PropTypes.func.isRequired,
};

MainImage.defaultProps = {
  images: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: null,
    url: null,
  })),
  currImgIndex: null,
  thumbnailIndexMax: null,
  thumbnailIndexMin: null,
};

export default MainImage;

const SubWrapper = styled.div`
  position: relative;
  isolation: isolate;
  display: grid;
  height: 50vw;
  max-height: 60vh;
  min-height: 550px;
  min-width: 100%;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(8, 1fr);
  justify-self: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  user-select: none;
  & .arrows-default {
    position: absolute;
    z-index: 70;
    height: 3vh;
    width: 3vh;
    min-height: 20px;
    min-width: 20px;
    grid-row: 4 / 6;
    cursor: pointer;
  };
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
  user-select: none;
`;

const Wrapper = styled.div`
  height: max-content;
  width: 100%;
  user-select: none;
  @media(max-width: 900px) {
    background: #F5EBE0;
    padding: 2.5%;
  }
`;
