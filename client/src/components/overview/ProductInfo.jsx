import React from 'react';
import { RiPinterestFill, RiTwitterFill, RiFacebookCircleFill } from 'react-icons/ri';

function ProductInfo({product, selectedStyle}) {
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
        <div>
          <h3>{product.slogan}</h3>
          <p>{product.description}</p>
        </div>
        <div>
        {/* Product Features Section */}
          <ul>
            {product.features.map((feature) => (
              feature.value !== null
                ? (
                  <li key={feature.feature}>
                    <span style={{ fontWeight: 'bold' }}>{feature.feature.concat(':')}</span>
                    &nbsp;
                    <span>{feature.value}</span>
                  </li>
                )
                : (
                  <li key={feature.feature}>
                    <span style={{ fontWeight: 'bold' }}>{feature.feature}</span>
                  </li>
                )
            ))}
          </ul>
        </div>
        <div>
          {/* Share on Social Media Section */}
          <RiFacebookCircleFill />
          <RiTwitterFill />
          <RiPinterestFill />
        </div>
      </div>
    );
  }
}

export default ProductInfo;
