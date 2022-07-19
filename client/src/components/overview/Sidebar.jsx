import React from 'react';
import styled from 'styled-components';
import ProductInfo from './ProductInfo.jsx';
import Checkout from './Checkout.jsx';
import StyleSelector from './StyleSelector.jsx';

function Sidebar({
  product, selectedStyle, styles, setSelectedStyle
}) {
  return (
    <Wrapper>
      <ProductInfo product={product} selectedStyle={selectedStyle} />
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
  min-width: min(550px, 1fr);
  max-width: max-content;
  grid-template-rows: repeat(3, max-content);
  grid-template-columns: max-content;
  align-content: center;
  align-items: center;
`;
