import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function SloganDescription({ product }) {
  if (Object.keys(product).length > 0) {
    // copying the features list and description to create dummy data for increased text length
    const description = [product.description, product.description, product.description].join(' ');
    return (
      <Wrapper>
        <h3 data-testid="slogan">{product.slogan}</h3>
            {/* <p test-data-id="description">{product.description}</p> */}
        <p data-testid="description">{description}</p>
      </Wrapper>
    );
  }
  return null;
}

export default SloganDescription;

const Wrapper = styled.div`
`;
