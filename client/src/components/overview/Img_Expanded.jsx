import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { IoExitOutline } from 'react-icons/io5';
import { BsCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

const styleMainCircle = {
  width: '11px',
  height: '15px',
  color: 'grey',
  cursor: 'pointer',
};

const styleCircles = {
  width: '8px',
  height: '8px',
  color: 'grey',
  opacity: 0.4,
  cursor: 'pointer',
};

const styleLeftArrow = {
  position: 'absolute',
  zIndex: 100,
  color: 'black',
  width: '4vw',
  height: '4vw',
  maxWidth: '4vh',
  maxHeight: '4vh',
  minWidth: '20px',
  minHeight: '20px',
  cursor: 'pointer',
  top: '50%',
  left: '5%',
};

const styleRightArrow = {
  position: 'absolute',
  zIndex: 100,
  color: 'black',
  width: '4vw',
  height: '4vw',
  maxWidth: '4vh',
  maxHeight: '4vh',
  minWidth: '20px',
  minHeight: '20px',
  cursor: 'pointer',
  top: '50%',
  right: '5%',
};

const styleExit = {
  position: 'absolute',
  zIndex: 100,
  color: 'black',
  width: '4vw',
  height: '4vw',
  maxWidth: '4vh',
  maxHeight: '4vh',
  minWidth: '20px',
  minHeight: '20px',
  cursor: 'pointer',
  top: '5%',
  right: '5%',
};

function ExpandedImage({
  images, currImgIndex, setCurrImgIndex, setExpandedView,
}) {
  if (images.length > 0) {
    return (
      <div>
        {images.map((image, index) => {
          if (index === currImgIndex) {
            return (
              <Wrapper key={index}>
                {index > 0 && (
                  <IoIosArrowDropleft
                    style={styleLeftArrow}
                    onClick={() => { setCurrImgIndex(currImgIndex - 1); }}
                  />
                )}
                <Image src={images[currImgIndex].url} alt="A representation of this product" loading="lazy" />
                <IoExitOutline data-testid="exit-expanded-btn" style={styleExit} onClick={() => { setExpandedView(false); }} />
                {index < images.length - 1 && (
                  <IoIosArrowDropright
                    style={styleRightArrow}
                    onClick={() => { setCurrImgIndex(currImgIndex + 1); }}
                  />
                )}
              </Wrapper>
            );
          }
          return null;
        })}
        <NavSymbols>
          {images.map((image, index) => (
            <BsCircleFill
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

const Wrapper = styled.div`
  position: relative;
  isolation: isolate;
  margin: auto;
  width: 90vw;
  height: 60vw;
  max-height: 80vh;
  max-width: 80vh;
`;

const NavSymbols = styled.div`
  display: grid;
  margin-top: 5px;
  width: 100%;
  height: 100%;
  gap: 5px;
  grid-auto-flow: column;
  grid-template-rows: max-content;
  grid-auto-columns: max-content;
  justify-content: center;
  align-content: end;
  justify-items: center;
  align-items: center;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  object-fit: contain;
`;
