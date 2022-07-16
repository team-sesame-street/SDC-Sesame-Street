import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { IoExitOutline } from 'react-icons/io5';
import { FiCircle } from 'react-icons/fi';
import styled from 'styled-components';

const NavSymbols = styled.div`
  display: grid;
  gap: 2px;
  grid-auto-flow: column;
  grid-template-rows: max-content;
  grid-auto-columns: max-content;
`;

const styleMainCircle = {
  width: '12px',
  height: '12px',
};

const styleCircles = {
  width: '9px',
  height: '9px',
};

function ExpandedImage({
  images, currImgIndex, setCurrImgIndex, setExpandedView,
}) {
  if (images.length > 0) {
    const styleExpandedImg = {
      cursor: 'crosshair',
    };

    return (
      <div>
        <h2>Expanded View</h2>
        {images.map((image, index) => (
          <div key={index}>
            {index === currImgIndex && index > 0
            && (<IoIosArrowDropleft onClick={() => { setCurrImgIndex(currImgIndex - 1); }} />)}
            {index === currImgIndex && (
              <img src={images[currImgIndex].url} alt="A representation of this product" style={styleExpandedImg} loading="lazy" />
            )}
            {index === currImgIndex && index < images.length - 1
            && (<IoIosArrowDropright onClick={() => { setCurrImgIndex(currImgIndex + 1); }} />)}
          </div>
        ))}
        <NavSymbols>
          {images.map((image, index) => (
            <FiCircle
              key={index}
              style={index === currImgIndex ? styleMainCircle : styleCircles}
              onClick={() => {
                if (index !== currImgIndex) {
                  setCurrImgIndex(index);
                }
              }}
            />
          ))}
        </NavSymbols>
        <IoExitOutline data-testid="exit-expanded-btn" onClick={() => { setExpandedView(false); }} />
      </div>
    );
  }
}

ExpandedImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  currImgIndex: PropTypes.number.isRequired,
  setCurrImgIndex: PropTypes.func.isRequired,
  setExpandedView: PropTypes.func.isRequired,
};

export default ExpandedImage;
