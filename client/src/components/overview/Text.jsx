import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Text({ product }) {
  if (Object.keys(product).length > 0) {
    // copying the features list and description to create dummy data for increased text length
    const features = product.features.concat(product.features);
    const description = [product.description, product.description, product.description].join(' ');
    return (
      <Wrapper>
        <SloganDescription>
          <h3>{product.slogan}</h3>
          {/* <p>{product.description}</p> */}
          <p>{description}</p>
        </SloganDescription>
        <Features>
          {/* {product.features.map((feature) => ( */}
          {features.map((feature, index) => (
            feature.value !== null
              ? (
                <li key={index}>
                  <span>
                    🌟
                    &nbsp;&nbsp;
                    <span style={{ fontWeight: 'bold' }}>{feature.feature.concat(':')}</span>
                    &nbsp;
                    <span>{feature.value}</span>
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
        </Features>
      </Wrapper>
    );
  }
  return null;
}

Text.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    campus: PropTypes.oneOf(['hr-rfp']),
    name: PropTypes.string,
    slogan: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }),
};

Text.defaultProps = {
  product: PropTypes.object.isRequired,
};

export default Text;

const Wrapper = styled.div`
  margin-left: 10vw;
  display: grid;
  gap: 0.5vh;
  grid-template-columns: repeat(auto-fit, minmax(550px, max-content));
`;

const SloganDescription = styled.div`
  height: max-content;
  width: 40vw;
  min-width: min(550px, 80vw);
`;

const Features = styled.ul`
  height: max-content;
  width: 25vw;
  min-width: min(550px, 80vw);
  list-style: none;
`;
