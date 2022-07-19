import React from 'react';
import styled from 'styled-components';
import ProductInfo from './ProductInfo.jsx';
import Checkout from './Checkout.jsx';
import StyleSelector from './StyleSelector.jsx';

function Sidebar ({ product, selectedStyle, styles, setSelectedStyle }) {
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
  height: max-content;
  width: max-content;
  min-width: min(550px, 80vw);
  max-width: max-content;
`;