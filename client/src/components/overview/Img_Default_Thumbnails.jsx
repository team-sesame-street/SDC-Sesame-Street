import React from 'react';
import PropTypes from 'prop-types';
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
      <div>
        <h2>Image Default Thumbnail</h2>
        {images.length > 7 && thumbnailIndexMin > 0 && (
          <RiArrowUpSFill
            onClick={() => {
              thumbnailIndexRange(thumbnailIndexMin - 1, thumbnailIndexMax - 1);
            }}
          />
        )}
        {images.length > 7 && thumbnailIndexMin === 0 && (
          <RiArrowUpSFill style={{ fill: '#eeeeee' }} />
        )}
        {images.map((image, index) => {
          const style = {
            opacity: index === currImgIndex ? 1 : 0.4,
            height: '50px',
            width: '50px',
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
        {images.length > 7 && thumbnailIndexMax < images.length - 1 && (
          <RiArrowDownSFill
            onClick={() => {
              thumbnailIndexRange(thumbnailIndexMin + 1, thumbnailIndexMax + 1);
            }}
          />
        )}
        {images.length > 7 && thumbnailIndexMax === images.length - 1 && (
          <RiArrowDownSFill style={{ fill: '#eeeeee' }} />
        )}
      </div>
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
