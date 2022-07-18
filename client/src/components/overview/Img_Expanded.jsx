import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { IoExitOutline } from 'react-icons/io5';
import { BsCircleFill } from 'react-icons/bs';
import styled from 'styled-components';


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
                  <IoIosArrowDropleft className="icon-expanded left-arrow-expanded"
                    onClick={() => { setCurrImgIndex(currImgIndex - 1); }}
                  />
                )}
                <Image src={images[currImgIndex].url} alt="A representation of this product" loading="lazy" />
                <IoExitOutline data-testid="exit-expanded-btn" className="icon-expanded exit-icon" onClick={() => { setExpandedView(false); }} />
                {index < images.length - 1 && (
                  <IoIosArrowDropright className="icon-expanded right-arrow-expanded"
                    onClick={() => { setCurrImgIndex(currImgIndex + 1); }}
                  />
                )}
              </Wrapper>
            );
          }
          return null;
        })}
        <NavSymbols>
          {images.map((image, index) => {
            const circleStyle = {
              width: index === currImgIndex ? '11px' : '8px',
              height: index === currImgIndex ? '11px': '8px',
            };
            return (
            <BsCircleFill
              className="nav-symbols-circles"
              key={index}
              style={circleStyle}
              onClick={() => {
                if (index !== currImgIndex) {
                  setCurrImgIndex(index);
                }
              }}
            />
          )})}
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
  & .icon-expanded {
    position: absolute;
    z-index: 100;
    color: black;
    width: 4vw;
    height: 4vw;
    max-width: 4vh;
    max-height: 4vh;
    min-width: 20px;
    min-height: 20px;
    cursor: pointer;
  };
  & .exit-icon {
    top: 5%;
    right: 5%;
  };
  & .left-arrow-expanded {
    top: 50%;
    left: 5%;
  };
  & .right-arrow-expanded {
    top: 50%;
    right: 5%;
  };
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
  & .nav-symbols-circles {
    color: grey;
    cursor: pointer;
  };
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  object-fit: contain;
`;
