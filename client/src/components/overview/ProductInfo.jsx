import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiPinterestFill, RiTwitterFill, RiFacebookCircleFill } from 'react-icons/ri';
import StarRatings from 'react-star-ratings';

function ProductInfo({ product, selectedStyle, avgRating, totalRatings, ratingsReviewsNode }) {
  if (Object.keys(product).length > 0 && Object.keys(selectedStyle).length > 0) {
    const formatPrice = (price) => ('$'.concat(price.slice(0, -3)));

    return (
      <Wrapper>
        {totalRatings && (
          <div>
            <StarRatings rating={avgRating} starDimension="18px" starSpacing="2px" starRatedColor="goldenrod" />
            &nbsp;
            &nbsp;
            <SyntheticLink onClick={() => { ratingsReviewsNode.current.scrollIntoView(); }}>
              Read all&nbsp;
              {totalRatings}
              &nbsp;reviews
            </SyntheticLink>
          </div>
        )}
        <h3 data-testid="category">{product.category.toUpperCase()}</h3>
        <h1 data-testid="product-name" style={{ lineHeight: '130%' }}>{product.name}</h1>
        {selectedStyle.sale_price === null
          ? (<p data-testid="price">{formatPrice(selectedStyle.original_price)}</p>)
          : (
            <p data-testid="price">
              <span style={{ color: 'red' }}>{formatPrice(selectedStyle.sale_price)}</span>
              &nbsp;
              <span style={{ textDecorationLine: 'line-through' }}>{formatPrice(selectedStyle.original_price)}</span>
            </p>
          )}
        <SocialSharingGrid>
          {/* Share on Social Media Section */}
          <RiFacebookCircleFill className="social-sharing" />
          <RiTwitterFill className="social-sharing" />
          <RiPinterestFill className="social-sharing" />
        </SocialSharingGrid>
      </Wrapper>
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

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  height: max-content;
  grid-template-rows: repeat(5, max-content);
  grid-template-columns: 1fr;
  gap: 2vh;
`;

const SocialSharingGrid = styled.div`
  display: grid;
  height: min-content;
  width: 12vh;
  grid-template-rows: max-content;
  grid-template-columns: repeat(3, max-content);
  gap: 1vh;
  cursor: pointer;
  & .social-sharing {
    min-width: 25px;
    min-height: 25px;
    width: 3vh;
    height: 3vh;
  }
`;

const SyntheticLink = styled.span`
  color: blue;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
