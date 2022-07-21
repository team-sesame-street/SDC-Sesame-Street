import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { IoExitOutline } from 'react-icons/io5';
import { BsCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
// import Zoom from './Img_Zoomed.jsx';

function ExpandedImage({
  images, currImgIndex, setCurrImgIndex, setExpandedView,
}) {
  const [zoom, setZoom] = useState(false);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [offsetPercentage, setOffsetPercentage] = useState({ x: 0, y: 0 });
  const container = useRef(null);
  // const expandedImg = useRef(null);

  const getSizingRatio = (e) => {
    const offset = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setContainerSize({
      width: container.current.clientWidth,
      height: container.current.clientHeight,
    });
    // const containerSize = {
    //   width: container.current.clientWidth,
    //   height: container.current.clientHeight,
    // };

    setOffsetPercentage({
      x: (offset.x / containerSize.width) * 100,
      y: (offset.y / containerSize.height) * 100,
    });
  };

  if (images.length > 0) {
    return (
      <ExtraWrapper>
        {/* {zoom && (
          <Zoom imageURL={images[currImgIndex].url} setZoom={setZoom} offsetPosition={offset} />
        )} */}
        {console.log('offset%:', offsetPercentage)}
        {images.map((image, index) => {
          if (index === currImgIndex) {
            return (
              <Wrapper ref={container}
                key={index}
                onClick={!zoom ? getSizingRatio : () => { setZoom(false); }}
                style={{
                  backgroundImage: !zoom ? 'none' : `url(${images[currImgIndex].url})`,
                  backgroundSize: `${containerSize.height * 2.5}px`,
                  backgroundPosition: `${offsetPercentage.x}% ${offsetPercentage.y}%`,
                }}
              >
                {!zoom && index > 0 && (
                  <IoIosArrowDropleft
                    className="icon-expanded left-arrow-expanded"
                    onClick={() => { setCurrImgIndex(currImgIndex - 1); }}
                  />
                )}
                {/* {zoom && (
                  <ZoomImg
                    useRef={zoomedImg}
                    src={images[currImgIndex].url}
                    alt="A zoomed in perspective"
                    onClick={() => { setZoom(false); }}
                    style={{ objectPosition: `-${offsetPercentage.x}% -${offsetPercentage.y}%` }}
                  />
                )} */}
                {!zoom && (
                  <Image
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
        {!zoom && (
          <NavSymbols>
            {images.map((image, index) => {
              const circleStyle = {
                width: index === currImgIndex ? '11px' : '8px',
                height: index === currImgIndex ? '11px' : '8px',
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
              );
            })}
          </NavSymbols>
        )}
      </ExtraWrapper>
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

const ExtraWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  background-color: grey;
  position: relative;
  isolation: isolate;
  margin: auto;
  width: 60vw;
  height: 60vw;
  background-repeat: no-repeat;
  // background-position: center;
  // width: 90%;
  // height: 90%;
  // max-height: 80vh;
  // max-width: 80vh;
  // overflow: hidden;

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
  @media(max-width: 500px) {
    width: 100%;
  }
`;

// const ZoomImg = styled.img`
//   position: absolute;
//   height: 250%;
//   width: 250%;
//   // min-width: auto;
//   object-fit: none;
//   // transform: scale(2.5);
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   object-position: center center;
// `;

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
  // width: auto;
  // height: auto;
  cursor: crosshair;
  object-fit: contain;
`;
