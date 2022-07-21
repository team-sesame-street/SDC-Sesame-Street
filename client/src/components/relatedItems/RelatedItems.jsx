/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Modal from './Modal.jsx';
import Ratings from './Ratings.jsx';

const SliderContainer = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  position: relative;
  align-items: center;
  @media(max-width: 500px) {
    width: 100%;
  }
  & #rightArrow, #leftArrow {
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
    margin-bottom: 20px;
    padding-left: 5px;
  }
`;

const left = {
  backgroundColor: 'white',
  borderRadius: '100%',
  position: 'absolute',
  left: '0',
  boxShadow: '2px 2px 1px 1px rgb(0 0 0 / 12%)',
  cursor: 'pointer',
  visibility: 'hidden',
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
  width: 100%;
  height: min-content;
  white-space: nowrap;
  overflow-x: hidden;
  scrollbar-width: none;
  scroll-behavior: smooth;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  @media(max-width: 500px) {
    overflow-x: auto;
  }
`;

const Card = styled.div`
  min-width: 310px;
  min-height: min-content;
  background: whitesmoke;
  border-radius: 10px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  position: relative;
  padding: 8px;
`;

const Image = styled.div`
  width: 100%;
  height: 280px;
  background-color: rgb(240 240 240 / 80%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: cover;
  cursor: pointer;
  background-image: URL(${({url}) => url});
`;

const Name = styled.p`
  padding: 0px 0px 1px 8px;
  font-weight: 900;
  cursor: pointer;
`;

const Price = styled.p`
  padding: 1px 0px 0px 9px;
  font-size: 12px;
`;

const Category = styled.p`
  padding-left: 8px;
  padding-top: 2px;
  font-size: 13px;
`;

const Star = styled.div`
  background: white;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  height: 22px;
  width: 22px;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 12px;
  margin-top: 12px;
  cursor: pointer;
`;

function RelatedItems({ slides, id, pageChange, reviews }) {
  const [modal, setModal] = useState(false);
  const [currOutfit, setCurrOutfit] = useState({});
  const [carouselPos, setCarouselPos] = useState(false);
  const [leftSide, setLeftSide] = useState(900);
  const imageSlider = document.querySelector('#slider');
  const rightArrow = document.querySelector('#rightArrow');
  const leftArrow = document.querySelector('#leftArrow');

  if (carouselPos) {
    imageSlider.scrollLeft = 0;
    setCarouselPos(false);
  }

  const slideLeft = () => {
    imageSlider.scrollLeft -= 350;
    setLeftSide(leftSide - 350);
  };

  const slideRight = () => {
    imageSlider.scrollLeft += 350;
    setLeftSide(leftSide + 350);
  };

  if (imageSlider && leftSide > imageSlider.scrollWidth - 15 && rightArrow) {
    rightArrow.style.visibility = 'hidden';
  } else if (imageSlider && leftSide < imageSlider.scrollWidth && rightArrow) {
    rightArrow.style.visibility = 'visible';
  }

  if (leftArrow && leftSide <= 900) {
    leftArrow.style.visibility = 'hidden';
  } else if (leftSide > 900 && leftArrow) {
    leftArrow.style.visibility = 'visible';
  }

  return (
    <Wrapper>
    <h2>Related Products</h2>
    <SliderContainer data-testid='related'>
      <MdChevronLeft size={40} style={left} onClick={slideLeft} id="leftArrow" data-testid='left-arrow'/>
      <Slider id="slider">
        {slides.info.length !== 0
        && slides.info.length === slides.urls.length
        && reviews.length === slides.info.length ? slides.info.map((slide, index) => (
          <Card
            key={index}
          >
            <Star
              onClick={() => {
                setCurrOutfit(slide);
                setModal(true);
              }}
            />
            <Image url={slides.urls[index].url}
              onClick={() => {
                setCarouselPos(true);
                setLeftSide(900);
                pageChange(slide.data.id);
              }}
            />
            <Category>{slide.data.category}</Category>
            <Name onClick={() => pageChange(slide.data.id)}>{slide.data.name}</Name>
            <Price data-testid='label'>
              {!slides.urls[index].salePrice
              ? <label>${slides.urls[index].originalPrice}</label>
              : <label style={{color:'red'}}>${slides.urls[index].salePrice} <strike style={{color:'black'}}>{slides.urls[index].originalPrice}</strike></label>}
            </Price>
             <Ratings rating={reviews[index].avg} key={index} />
          </Card>
        )) : <></>}
        <Modal open={modal} closeModal={() => setModal(false)} currOutfit={currOutfit} id={id} />
      </Slider>
      <MdChevronRight id="rightArrow" size={40} style={right} onClick={slideRight} data-testid='right-arrow' />
    </SliderContainer>
    </Wrapper>
  );
}

export default RelatedItems;
