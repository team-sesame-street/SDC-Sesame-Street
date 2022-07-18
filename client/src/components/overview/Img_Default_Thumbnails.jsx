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

    const upArrowStyle = {
      minWidth: '50px',
      width: '8vh',
      fill: thumbnailIndexMin === 0 ? '#eeeeee' : 'default',
    };

    const downArrowStyle = {
      minWidth: '50px',
      width: '8vh',
      fill: thumbnailIndexMax === images.length - 1 ? '#eeeeee' : 'default',
    };

    return (
      <Wrapper>
        {images.length > 7 && (
          <RiArrowUpSFill
            style={upArrowStyle}
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
            const style = {
              opacity: index === currImgIndex ? 1 : 0.4,
              minHeight: '50px',
              minWidth: '50px',
              height: '8vh',
              width: '8vh',
              objectFit: 'cover',
              border: '1px solid black',
            };

            return (
              <div key={index}>
                {index >= thumbnailIndexMin && index <= thumbnailIndexMax
                && (<img src={image.thumbnail_url} style={style} alt={`product representation #${index}`} onClick={() => { setCurrImgIndex(index); }} loading="lazy"/>)}

              </div>
            );
          })}
        </ThumbnailsGrid>
        {images.length > 7 && (
          <RiArrowDownSFill
            style={downArrowStyle}
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
  width: max-content;
  height: max-content;
  max-width: 100%;
  max-height: 100%;
  grid-template-rows: repeat(3, max-content);
  grid-template-columns: 1fr;
  cursor: pointer;
`;

const ThumbnailsGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: max-content;
  grid-auto-rows: max-content;
  gap: 2px;
`;
