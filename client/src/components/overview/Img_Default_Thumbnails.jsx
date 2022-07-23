import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

function ImageDefaultThumbnail({
  images, currImgIndex, setCurrImgIndex, thumbnailIndexMin, thumbnailIndexMax, setThumbnailIndexMin,
  setThumbnailIndexMax,
}) {
  if (images.length > 0) {
    const thumbnailIndexRange = (min, max) => {
      setThumbnailIndexMin(min);
      setThumbnailIndexMax(max);
    };

    return (
      <Wrapper>
        {console.log(images)}
        {images.length > 7 && (
          <RiArrowUpSFill
            className="arrows-thumbnail"
            style={{ fill: thumbnailIndexMin === 0 ? '#807d7d' : 'default' }}
            data-testid="up-arrow-active"
            onClick={() => {
              if (thumbnailIndexMin > 0) {
                thumbnailIndexRange(thumbnailIndexMin - 1, thumbnailIndexMax - 1);
              }
            }}
          />
        )}
        <ThumbnailsGrid>
          {images.map((image, index) => {
            if (index >= thumbnailIndexMin && index <= thumbnailIndexMax) {
              // clean up inccorect url address format and check for null url
              let url = image.thumbnail_url
                ? image.thumbnail_url
                : 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2329&q=80';
              if (url.indexOf('http') !== 0) {
                url = url.slice(url.indexOf('http'));
              }
              return (
                <ThumbnailImage
                  style={{ opacity: index === currImgIndex ? 1 : 0.4 }}
                  key={index}
                  alt={`product representation #${index}`}
                  onClick={() => { setCurrImgIndex(index); }}
                  src={url}
                  loading="lazy"
                />
              );
            }
            return null;
          })}
        </ThumbnailsGrid>
        {images.length > 7 && (
          <RiArrowDownSFill
            className="arrows-thumbnail"
            style={{ fill: thumbnailIndexMax === images.length - 1 ? '#807d7d' : 'default' }}
            onClick={() => {
              if (thumbnailIndexMax < images.length - 1) {
                thumbnailIndexRange(thumbnailIndexMin + 1, thumbnailIndexMax + 1);
              }
            }}
          />
        )}
      </Wrapper>
    );
  }
}

ImageDefaultThumbnail.propTypes = {
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
};

ImageDefaultThumbnail.defaultProps = {
  currImgIndex: null,
  thumbnailIndexMax: null,
  thumbnailIndexMin: null,
};

export default ImageDefaultThumbnail;

const Wrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 9;
  position: absolute;
  z-index: 100;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(3, max-content);
  grid-template-columns: max-content;
  align-content: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
  & .arrows-thumbnail {
    width: 50px;
  };
`;

const ThumbnailsGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  max-height: 95%;
  min-width: 1fr;
  grid-template-columns: max-content;
  grid-template-rows: repeat(auto-fill, max-content);
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  gap: 6px;
`;

const ThumbnailImage = styled.img`
  min-height: 45px;
  min-width: 45px;
  height: 4.5vw;
  width: 4.5vw;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    border: 2px solid black;
  }
  @media (min-width: 1500px) {
    height: 70px;
    width: 70px;
  }
`;
