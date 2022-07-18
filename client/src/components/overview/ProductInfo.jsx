import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiPinterestFill, RiTwitterFill, RiFacebookCircleFill } from 'react-icons/ri';

const socialSharingStyling = {
  minWidth: '25px',
  minHeight: '25px',
  width: '3vh',
  height: '3vh',
};

function ProductInfo({ product, selectedStyle }) {
  if (Object.keys(product).length > 0 && Object.keys(selectedStyle).length > 0) {
    const formatPrice = (price) => ('$'.concat(price.slice(0, -3)));

    return (
      <div>
        <p>{product.category.toUpperCase()}</p>
        <h2>{product.name}</h2>
        {selectedStyle.sale_price === null
          ? (<p>{formatPrice(selectedStyle.original_price)}</p>)
          : (
            <p>
              <span style={{ color: 'red' }}>{formatPrice(selectedStyle.sale_price)}</span>
              &nbsp;
              <span style={{ textDecorationLine: 'line-through' }}>{formatPrice(selectedStyle.original_price)}</span>
            </p>
          )}
        <SocialSharingGrid>
          {/* Share on Social Media Section */}
          <RiFacebookCircleFill style={socialSharingStyling} />
          <RiTwitterFill style={socialSharingStyling} />
          <RiPinterestFill style={socialSharingStyling} />
        </SocialSharingGrid>
      </div>
    );
  }
  return null;
}

ProductInfo.propTypes = {
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
  selectedStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })),
    skus: PropTypes.objectOf(PropTypes.shape({
      quantity: PropTypes.number,
      size: PropTypes.string,
    })),
  }),
};

ProductInfo.defaultProps = {
  product: PropTypes.object.isRequired,
  selectedStyle: PropTypes.object.isRequired,
};

export default ProductInfo;

const SocialSharingGrid = styled.div`
  display: grid;
  width: 12vh;
  grid-template-rows: max-content;
  grid-template-columns: repeat(3, max-content);
  gap: 1vh;
`;
