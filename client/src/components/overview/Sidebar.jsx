import React from 'react';
import styled from 'styled-components';
import ProductInfo from './ProductInfo.jsx';
import Checkout from './Checkout.jsx';
import StyleSelector from './StyleSelector.jsx';

function Sidebar({
  product, selectedStyle, styles, setSelectedStyle, avgRating, totalRatings, ratingsReviewsNode
}) {
  return (
    <Wrapper>
      <ProductInfo
        product={product}
        selectedStyle={selectedStyle}
        avgRating={avgRating}
        totalRatings={totalRatings}
        ratingsReviewsNode={ratingsReviewsNode}
      />
      <StyleSelector
        styles={styles}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />
      <Checkout
        selectedStyle={selectedStyle}
      />
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  height: max-content;
  min-width: max(550px, 1fr);
  max-width: 100%;
  grid-template-rows: max-content max-content 150px;
  grid-template-columns: 1fr;
  align-self: center;
  align-content: center;
  align-items: center;
  gap: 10px;
  @media(max-width: 900px) {
    padding-left: 5%;
    padding-right: 5%;
  }
`;
