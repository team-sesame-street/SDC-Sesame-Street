/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import OutfitList from './OutfitList.jsx';

function Outfit({
  currOutfit, addOutfit, outfitSlides, deleteOutfit,
}) {
  const slideLeft = () => {
    const slider = document.getElementById('slider2');
    slider.scrollLeft -= 310;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider2');
    slider.scrollLeft += 310;
  };

  const clickHandler = () => {
    for (const outfit of outfitSlides) {
      if (outfit.id === currOutfit.info.id) return;
    }
    const obj = {};
    obj.id = currOutfit.info.id;
    obj.url = currOutfit.styles.photos[0].thumbnail_url;
    obj.name = currOutfit.info.name;
    obj.category = currOutfit.info.category;
    obj.price = currOutfit.info.default_price;
    addOutfit(obj);
  };

  const imageRender = () => {
    if (outfitSlides.length !== 0) {
      return (
        outfitSlides.map((slide, index) => (
          <OutfitList key={index} slide={slide} deleteOutfit={deleteOutfit} />
        ))
      );
    }
  };

  return (
    <div style={sliderContainer}>
      <MdChevronLeft size={40} style={left} onClick={slideLeft} />
      <div id="slider2" style={slider}>
        {imageRender()}
        {outfitSlides.length !== 0 ? (<>
        <button style={{...plusSignStyle, transform: 'translateY(-175px)' }} onClick={clickHandler}>+</button>
        <button style={{...addOutfitStyle, transform: 'translate(-200px, -145px)' }} onClick={clickHandler}>Add an Outfit</button></>)
        : (<>
        <button style={{...plusSignStyle, transform: 'translateY(145px)' }} onClick={clickHandler}>+</button>
        <button style={{...addOutfitStyle, transform: 'translate(-200px, 175px)' }} onClick={clickHandler}>Add an Outfit</button>
        </>)}
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

const addOutfitStyle = {
  color: 'gray',
  background: 'white',
  fontWeight: '700',
  fontSize: '15px',
  borderStyle: 'none',
  cursor: 'pointer  ',
};

const plusSignStyle = {
  color: 'gray',
  background: 'white',
  fontWeight: '700',
  fontSize: '35px',
  borderStyle: 'none',
  cursor: 'pointer  ',
  width: '290px',
}

export default Outfit;
