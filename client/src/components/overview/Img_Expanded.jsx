import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { IoExitOutline } from 'react-icons/io5';
import { FiCircle } from 'react-icons/fi';
import styled from 'styled-components';

const NavSymbols = styled.div`
  display: grid;
  width: max-content;
  height: max-content;
  grid-auto-flow: column;
  grid-template-rows: max-content;
  grid-auto-columns: max-content;
`;

function ExpandedImage({
  images, currImgIndex, setCurrImgIndex, setExpandedView,
}) {
  if (images.length > 0) {
    const styleMainCircle = {
      fontSize: '15px',
    };

    const styleCircles = {
      fontSize: '10px',
    };

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
