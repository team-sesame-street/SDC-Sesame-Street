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
  width: 100%;
  height: min-content;
  display: flex;
  position: relative;
  align-items: center;
  @media(max-width: 500px) {
    width: 100%;
  }
  & #outfitRightArrow, #oufitLeftArrow {
    &:hover {
      transform: scale(1.15);
    }
  }
`;

const Wrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    align-self: flex-start;
    margin-bottom: 10px;
    padding-left: 5px;
  }
`;

const left = {
  backgroundColor: 'white',
  borderRadius: '100%',
  position: 'absolute',
  left: '0',
  boxShadow: '2px 2px 1px 1px rgb(0 0 0 / 5%)',
  cursor: 'pointer',
  zIndex: 1000,
};

const right = {
  backgroundColor: 'white',
  borderRadius: '100%',
  position: 'absolute',
  right: '0',
  boxShadow: '2px 2px 1px 1px rgb(0 0 0 / 12%)',
  cursor: 'pointer',
};

const Slider = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 100%;
  white-space: nowrap;
  overflow-x: hidden;
  scrollbar-width: none;
  scroll-behavior: smooth;
  overflow-y: hidden;
  @media(max-width: 500px) {
    overflow-x: scroll;
  };
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  };
`;

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
};

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Outfit({
  currOutfit, addOutfit, outfitSlides, deleteOutfit, pageChange,
}) {
  const [leftSide, setLeftSide] = useState(900);
  const imageContainer = document.querySelector('#slider2');
  const rightArrow = document.querySelector('#outfitRightArrow');
  const leftArrow = document.querySelector('#outfitLeftArrow');

  if (imageContainer && leftSide >= imageContainer.scrollWidth - 15 && rightArrow) {
    rightArrow.style.visibility = 'hidden';
  } else if (imageContainer && leftSide < imageContainer.scrollWidth && rightArrow) {
    rightArrow.style.visibility = 'visible';
  }

  if (leftSide <= 900 && leftArrow) {
    leftArrow.style.visibility = 'hidden';
  } else if (leftSide > 900 && leftArrow) {
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
    const currentList = JSON.parse(localStorage.getItem('list')) || [];
    localStorage.setItem('list', JSON.stringify([...currentList, obj]));
  };

  const imageRender = () => {
    if (outfitSlides.length !== 0) {
      return (
        outfitSlides.map((slide, index) => (
          <OutfitList key={index} slide={slide} deleteOutfit={deleteOutfit} pageChange={pageChange} />
        ))
      );
    }
  };

  return (
    <Wrapper>
      <h2>Your Outfit</h2>
      <SliderContainer>
        <MdChevronLeft size={40} style={left} onClick={slideLeft} id="outfitLeftArrow" />
        <Slider id="slider2">
          {imageRender()}
            <Button>
              <button style={{ ...plusSignStyle }} onClick={clickHandler}>+</button>
              <button style={{ ...addOutfitStyle }} onClick={clickHandler}>Add an Outfit</button>
            </Button>
        </Slider>
        <MdChevronRight size={40} style={right} onClick={slideRight} id="outfitRightArrow" />
      </SliderContainer>
    </Wrapper>
  );
}

export default Outfit;
