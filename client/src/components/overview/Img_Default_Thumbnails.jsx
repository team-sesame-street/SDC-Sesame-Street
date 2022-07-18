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
      // minWidth: '50px',
      width: '50px',
      fill: thumbnailIndexMin === 0 ? '#eeeeee' : 'default',
    };

    const downArrowStyle = {
      // minWidth: '50px',
      width: '50px',
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
            const ThumbnailImage = styled.img`
              opacity: ${index === currImgIndex ? 1 : 0.4};
              minHeight: 45px;
              minWidth: 45px;
              height: 4.5vw;
              width: 4.5vw;
              objectFit: cover;
              border: 1px solid black;
              cursor: pointer;
              &:hover {
                opacity: 1;
              }
            `;
            if (index >= thumbnailIndexMin && index <= thumbnailIndexMax) {
              return (
                <ThumbnailImage key={index} src={image.thumbnail_url} alt={`product representation #${index}`} onClick={() => { setCurrImgIndex(index); }} loading="lazy"/>
              );
            }
            return null;
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
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(3, max-content);
  grid-template-columns: max-content;
  align-content: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
  }
`;

const ThumbnailsGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  min-width: 1fr;
  grid-template-columns: max-content;
  grid-template-rows: repeat(auto-fill, max-content);
  align-content: center;
  align-items: center;
  justify-items: center;
  gap: 6px;
`;
