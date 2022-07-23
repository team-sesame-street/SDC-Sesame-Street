import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { BsCircleFill } from 'react-icons/bs';
import { IoExitOutline } from 'react-icons/io5';
import styled from 'styled-components';
import ModalExpanded from '../../../utils/ModalExpanded.jsx';
// const svg = require('./Images/minus.svg');

function ExpandedImage({
  images, currImgIndex, setCurrImgIndex, setExpandedView,
}) {
  const [zoom, setZoom] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [offsetPercentage, setOffsetPercentage] = useState({ x: 0, y: 0 });
  const container = useRef(null);

  const getSizingRatio = (e) => {
    const offset = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setContainerSize({
      width: container.current.clientWidth,
      height: container.current.clientHeight,
    });

    setOffsetPercentage({
      x: (offset.x / containerSize.width) * 100,
      y: (offset.y / containerSize.height) * 100,
    });
  };

  const moveBackgroundImg = (e) => {
    if (zoom) {
      const offset = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
      setOffsetPercentage({
        x: (offset.x / containerSize.width) * 100,
        y: (offset.y / containerSize.height) * 100,
      });
      container.current.style.backgroundPosition = `-${offsetPercentage.x}% -${offsetPercentage.y}%`;
    }
  };

  const exitExpandedView = () => { setExpandedView(false); };

  if (images.length > 0) {
    return (
      <ModalExpanded cb3={exitExpandedView} zoom={zoom}>
        {console.log(zoom)}
        {/* {console.log('offset%:', offsetPercentage)} */}
        {images.map((image, index) => {
          if (index === currImgIndex) {
            return (
              <Wrapper
                ref={container}
                key={index}
                onClick={!zoom ? getSizingRatio : () => { setZoom(false); }}
                style={{
                  backgroundImage: !zoom ? 'none' : `url(${images[currImgIndex].url})`,
                  backgroundSize: `${containerSize.height * 2.5}px`,
                  backgroundPosition: `${offsetPercentage.x}% ${offsetPercentage.y}%`,
                  cursor: zoom ? 'zoom-out' : 'crosshair',
                }}
                onMouseMove={moveBackgroundImg}
              >
                {!zoom && index > 0 && (
                  <IoIosArrowDropleft
                    className="icon-expanded left-arrow-expanded"
                    onClick={() => { setCurrImgIndex(currImgIndex - 1); }}
                  />
                )}
                {!zoom && (
                  <Image
                    classname="main-img"
                    src={images[currImgIndex].url}
                    alt="A representation of this product"
                    loading="lazy"
                    onClick={() => { setZoom(true); }}
                  />
                )}
                {!zoom && (
                  <IoExitOutline data-testid="exit-expanded-btn" className="icon-expanded exit-icon" onClick={() => { setExpandedView(false); }} />
                )}
                {!zoom && index < images.length - 1 && (
                  <IoIosArrowDropright
                    className="icon-expanded right-arrow-expanded"
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
              height: index === currImgIndex ? '11px' : '8px',
              visibility: zoom ? 'hidden' : 'visible',
            };
            return (
              <BsCircleFill
                data-testid="nav-symbols-circles"
                className="nav-symbols-circles"
                key={index}
                style={circleStyle}
                onClick={() => {
                  if (index !== currImgIndex) {
                    setCurrImgIndex(index);
                  }
                }}
              />
              // <NavCircles
              //   src="https://cdn-icons-png.flaticon.com/512/481/481078.png"
              //   alt="circle"
              //   data-testid="nav-symbols-circles"
              //   key={index}
              //   style={circleStyle}
              //   onClick={() => {
              //     if (index !== currImgIndex) {
              //       setCurrImgIndex(index);
              //     }
              //   }}
              // />
            );
          })}
        </NavSymbols>
      </ModalExpanded>
    );
  }
  return null;
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
  width: 60vw;
  height: 60vw;
  background-repeat: no-repeat;
  // overflow: hidden;

  & .icon-expanded {
    position: absolute;
    z-index: 100;
    color: black;
    width: 30px;
    height: 30px;
    cursor: pointer;
  };
  & .exit-icon {
    top: 5%;
    right: 5%;
    & :hover {
      opacity: 0.4;
    }
  };
  & .left-arrow-expanded {
    top: 50%;
    left: 5%;
  };
  & .right-arrow-expanded {
    top: 50%;
    right: 5%;
  };
  @media(max-width: 500px) {
    width: 100%;
  }
  @media(min-width: 1200px) {
    width: 90%;
    height: 90%;
  }
`;

const NavSymbols = styled.div`
  display: grid;
  margin-top: 2.5vh;
  width: 100%;
  height: max-content;
  gap: 5px;
  grid-auto-flow: column;
  grid-template-rows: max-content;
  grid-auto-columns: max-content;
  justify-content: center;
  align-content: end;
  justify-items: center;
  align-items: center;
  user-select: none;
  & .nav-symbols-circles {
    fill: #D5BDAF;
    cursor: pointer;
  };
`;

// const NavCircles = styled.img`
// `;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  cursor: crosshair;
`;
