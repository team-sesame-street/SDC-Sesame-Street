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
  width: 50%;
  height: 380px;
  display: flex;
  position: relative;
  align-items: center;
`;

const left = {
  backgroundColor: 'white',
  borderRadius: '100%',
  position: 'absolute',
  left: '0',
  boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 12%)',
  cursor: 'pointer',
  visibility: 'hidden',
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
`;

const Card = styled.div`
  width: 310px;
  height: 365px;
  background: white;
  border-radius: 10px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

const Image = styled.div`
  width: 100%;
  height: 75%;
  background-color: rgb(240 240 240 / 80%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: cover;
  background-image: URL(${({url}) => url});
`;

const Title = styled.p`
  margin: 0px 0px 3px 10px;
  font-weight: 900;
`

const Price = styled.p`
  margin: 1px 0px 0px 10px;
  font-size: 12px;
`

const Category = styled.p`
  margin-left: 10px;
  font-size: 13px;
`

const Star = styled.div`
  background: gold;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  height: 22px;
  width: 22px;
  float: right;
  margin-right: 10px;
  margin-top: 10px;
`

function RelatedItems({ slides, id, pageChange, reviews }) {
  const [modal, setModal] = useState(false);
  const [currOutfit, setCurrOutfit] = useState({});
  const [carouselPos, setCarouselPos] = useState(false);
  const [leftSide, setLeftSide] = useState(700);
  const imageSlider = document.querySelector('#slider');
  const rightArrow = document.querySelector('#rightArrow');
  const leftArrow = document.querySelector('#leftArrow');

  if (carouselPos) {
    imageSlider.scrollLeft = 0;
    setCarouselPos(false);
  }

  const slideLeft = () => {
    imageSlider.scrollLeft -= 320;
    setLeftSide(leftSide - 320);
  };

  const slideRight = () => {
    imageSlider.scrollLeft += 320;
    setLeftSide(leftSide + 320);
  };

  if (imageSlider && leftSide > imageSlider.scrollWidth - 15 && rightArrow) {
    rightArrow.style.visibility = 'hidden';
  } else if (imageSlider && leftSide < imageSlider.scrollWidth && rightArrow) {
    rightArrow.style.visibility = 'visible';
  }

  if (leftArrow && leftSide <= 700) {
    leftArrow.style.visibility = 'hidden';
  } else if (leftSide > 700 && leftArrow) {
    leftArrow.style.visibility = 'visible';
  }

  return (
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
                setCarouselPos(true)
                setLeftSide(0)
                pageChange(slide.data.id)
              }}
            />
            <Category>{slide.data.category}</Category>
            <Title>{slide.data.name}</Title>
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
  );
}

export default RelatedItems;
