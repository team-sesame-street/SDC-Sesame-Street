import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Features({ product }) {
  if (Object.keys(product).length > 0) {
    // copying the features list and description to create dummy data for increased text length
    const features = product.features.concat(product.features);
    return (
      <Wrapper>
        {/* {product.features.map((feature) => ( */}
        {features.map((feature, index) => (
          feature.value !== null
            ? (
              <li key={index}>
                <span data-testid="feature-description">
                  🌟
                  &nbsp;&nbsp;
                  <span data-testid="feature" style={{ fontWeight: 'bold' }}>{feature.feature.concat(':')}</span>
                  &nbsp;
                  <span data-testid="feature-value">{feature.value}</span>
                </span>
              </li>
            )
            : (
              <li key={index}>
                <span>
                  🌟
                  &nbsp;&nbsp;
                  <span style={{ fontWeight: 'bold' }}>{feature.feature}</span>
                </span>
              </li>
            )
        ))}
      </Wrapper>
    );
  }
  return null;
}

export default Features;

const Wrapper = styled.ul`
  list-style: none;
  padding-left: 10%;
  margin: 0;
`;
