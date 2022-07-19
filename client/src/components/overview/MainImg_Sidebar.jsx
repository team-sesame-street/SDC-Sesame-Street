import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import MainImage from './Img_Default_Main_Carousel.jsx';
import Sidebar from './Sidebar.jsx';

function MainImg_Sidebar(
  {
    product, selectedStyle, styles, setSelectedStyle, images, currImgIndex,
    setCurrImgIndex, thumbnailIndexMin, thumbnailIndexMax, setThumbnailIndexMin,
    setThumbnailIndexMax, setExpandedView
  },
) {
  return (
    <Wrapper>
      <MainImage
        images={images}
        currImgIndex={currImgIndex}
        setCurrImgIndex={setCurrImgIndex}
        thumbnailIndexMin={thumbnailIndexMin}
        thumbnailIndexMax={thumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setThumbnailIndexMax={setThumbnailIndexMax}
        setExpandedView={setExpandedView}
      />
      <Sidebar
        product={product}
        selectedStyle={selectedStyle}
        styles={styles}
        setSelectedStyle={setSelectedStyle} />
    </Wrapper>
  )
}

export default MainImg_Sidebar;

const Wrapper = styled.div`
  margin: auto;
  // background-color: grey;
  display: grid;
  gap: 2vw;
  grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
`;
