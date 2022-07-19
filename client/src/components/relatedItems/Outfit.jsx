/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styled from 'styled-components';
import OutfitList from './OutfitList.jsx';

const SliderContainer = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  position: relative;
  align-items: center;
`

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

const Slider = styled.div`
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;
`

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

function Outfit({
  currOutfit, addOutfit, outfitSlides, deleteOutfit,
}) {
  const [leftSide, setLeftSide] = useState(700);
  const imageContainer = document.querySelector('#slider2');
  const rightArrow = document.querySelector('#outfitRightArrow');
  const leftArrow = document.querySelector('#outfitLeftArrow');

  if (imageContainer && leftSide >= imageContainer.scrollWidth - 15 && rightArrow) {
    rightArrow.style.visibility = 'hidden';
  } else if (imageContainer && leftSide < imageContainer.scrollWidth && rightArrow) {
    rightArrow.style.visibility = 'visible';
  }

  if (leftSide <= 700 && leftArrow) {
    leftArrow.style.visibility = 'hidden';
  } else if (leftSide > 700 && leftArrow) {
    leftArrow.style.visibility = 'visible';
  }

  const slideLeft = () => {
    imageContainer.scrollLeft -= 320;
    setLeftSide(leftSide - 320);
  };

  const slideRight = () => {
    imageContainer.scrollLeft += 320;
    setLeftSide(leftSide + 320);
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
    obj.avg = currOutfit.avg;
    addOutfit(obj);
    const currentList = JSON.parse(localStorage.getItem('list')) || []
    localStorage.setItem('list', JSON.stringify([...currentList, obj]));
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
    <SliderContainer>
      <MdChevronLeft size={40} style={left} onClick={slideLeft} id="outfitLeftArrow" />
      <Slider id="slider2">
        {imageRender()}
        {outfitSlides.length !== 0 ? (<>
        <button style={{...plusSignStyle, transform: 'translateY(-175px)' }} onClick={clickHandler}>+</button>
        <button style={{...addOutfitStyle, transform: 'translate(-200px, -145px)' }} onClick={clickHandler}>Add an Outfit</button></>)
        : (<>
        <button style={{...plusSignStyle, transform: 'translateY(145px)' }} onClick={clickHandler}>+</button>
        <button style={{...addOutfitStyle, transform: 'translate(-200px, 175px)' }} onClick={clickHandler}>Add an Outfit</button>
        </>)}
      </Slider>
      <MdChevronRight size={40} style={right} onClick={slideRight} id="outfitRightArrow" />
    </SliderContainer>
  );
}

export default Outfit;
