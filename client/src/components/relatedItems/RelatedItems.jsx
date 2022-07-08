/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// import axios from 'axios';

function Outfit({ slides, slidesInfo }) {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft -= 300;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft += 300;
  };

  return (
    <div style={sliderContainer}>
      <MdChevronLeft size={40} style={left} onClick={slideLeft} />
      <div id="slider" style={slider}>
        {slidesInfo.map((slide, index) => (
          <div style={card} key={index}>
            <div style={{ ...imageStyle, backgroundImage: `url(${slides[index].url})` }}> </div>
            <p style={categoryStyle}>{slide.data.category}</p>
            <p style={titleStyle}>{slide.data.name}</p>
            <p style={priceStyle}>{slide.data.default_price}</p>
            <div style={{ marginLeft: '8px' }}>
              <div style={star} />
              <div style={star} />
              <div style={star} />
              <div style={star} />
              <div style={star} />
            </div>
          </div>
        ))}
      </div>
      <MdChevronRight size={40} style={right} onClick={slideRight} />
    </div>
  );
}

const sliderContainer = {
  width: '50%',
  height: '380px',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
};

const left = {
  backgroundColor: 'white',
  borderRadius: '100%',
  position: 'absolute',
  left: '0',
  boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 12%)',
  cursor: 'pointer',
};

const right = {
  backgroundColor: 'white',
  borderRadius: '100%',
  position: 'absolute',
  right: '0',
  boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 12%)',
  cursor: 'pointer',
};

const slider = {
  width: '100%',
  height: '100%',
  whiteSpace: 'nowrap',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
};

const card = {
  width: '300px',
  height: '365px',
  background: 'white',
  borderRadius: '10px',
  display: 'inline-block',
  marginLeft: '5px',
  marginRight: '5px',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  height: '75%',
  backgroundColor: 'rgb(240 240 240 / 80%)',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  backgroundSize: 'cover',
};

const titleStyle = {
  margin: '0px 0px 3px 10px',
  fontWeight: '900',
};
const priceStyle = {
  margin: '1px 0px 0px 10px',
  fontSize: '12px',
};

const categoryStyle = {
  marginLeft: '10px',
  fontSize: '13px',
};

const star = {
  background: 'gold',
  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  display: 'inline-block',
  height: '15px',
  width: '15px',
};

export default Outfit;
