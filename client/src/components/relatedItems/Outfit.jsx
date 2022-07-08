/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function RelatedItems({ slides }) {
  const slideLeft = () => {
    const slider = document.getElementById('slider2');
    slider.scrollLeft -= 300;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider2');
    slider.scrollLeft += 300;
  };

  return (
    <div style={sliderContainer}>
      <MdChevronLeft size={40} style={left} onClick={slideLeft} />
      <div id="slider2" style={slider}>
        {slides.map((slide, index) => (
          <div style={card} key={index}>
            <div style={{ ...imageStyle, backgroundImage: `url(${slide.url})` }}> </div>
            <p style={titleStyle}>{slide.title}</p>
            <p style={descStyle}>{slide.description}</p>
          </div>
        ))}
      </div>
      <MdChevronRight size={40} style={right} onClick={slideRight} />
    </div>
  );
}

const sliderContainer = {
  width: '90%',
  height: '300px',
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
  height: '300px',
  background: 'white',
  borderRadius: '10px',
  display: 'inline-block',
  marginLeft: '5px',
  marginRight: '5px',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  height: '220px',
  backgroundColor: 'rgb(240 240 240 / 80%)',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  backgroundSize: 'cover',
};

const titleStyle = {
  margin: '5px 0px 5px 10px',
  fontWeight: '500',
  marginTop: '10px',
};

const descStyle = {
  margin: '10px 0px 5px 10px',
  fontSize: '13px',
};

export default RelatedItems;
