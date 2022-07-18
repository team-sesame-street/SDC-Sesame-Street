/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Modal from './Modal.jsx';
import Ratings from './Ratings.jsx';

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

const slider = {
  width: '100%',
  height: '100%',
  whiteSpace: 'nowrap',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
};

const card = {
  width: '310px',
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
  height: '22px',
  width: '22px',
  float: 'right',
  marginRight: '10px',
  marginTop: '10px',
};

function RelatedItems({ slides, id, pageChange, reviews }) {
  const [modal, setModal] = useState(false);
  const [currOutfit, setCurrOutfit] = useState({});
  const [carouselPos, setCarouselPos] = useState(false);
  const [leftSide, setLeftSide] = useState(700);
  const imageSlider = document.querySelector('#slider');
  const rightArrow = document.querySelector('#rightArrow');
  const leftArrow = document.querySelector('#leftArrow');



  const width = imageSlider?.offsetWidth - 300


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
    <div data-testid='related' style={sliderContainer}>
      <MdChevronLeft size={40} style={left} onClick={slideLeft} id="leftArrow" data-testid='left-arrow'/>
      <div id="slider" style={slider}>
        {slides.info.length !== 0 && slides.info.length === slides.urls.length && reviews.length === slides.info.length ? slides.info.map((slide, index) => (
          <div
            style={card}
            key={index}
          >
            <div
              style={star}
              onClick={() => {
                setCurrOutfit(slide);
                setModal(true);
              }}
            />
            <div style={{ ...imageStyle, backgroundImage: `URL(${slides.urls[index].url})`, }} onClick={() => {
                setCarouselPos(true)
                setLeftSide(0)
                pageChange(slide.data.id)
              }}
            >
            </div>
            <p style={categoryStyle}>{slide.data.category}</p>
            <p style={titleStyle}>{slide.data.name}</p>
            <p style={priceStyle} data-testid='label'>
              {!slides.urls[index].salePrice ?
              <label>${slides.urls[index].originalPrice}</label> :
              <label style={{color:'red'}}>${slides.urls[index].salePrice} <strike style={{color:'black'}}>{slides.urls[index].originalPrice}</strike></label>}
            </p>
             <Ratings rating={reviews[index].avg} key={index} />
          </div>
        )) : <></>}
        <Modal open={modal} closeModal={() => setModal(false)} currOutfit={currOutfit} id={id} />
      </div>
      <MdChevronRight id="rightArrow" size={40} style={right} onClick={slideRight} data-testid='right-arrow' />
    </div>
  );
}

export default RelatedItems;
