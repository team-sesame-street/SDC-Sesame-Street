import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductInfo from '../../../src/components/overview/ProductInfo.jsx';
import productInfo from './ProductInfoDataTest.js';
import product from './ProductDataTest.js';

const styles = product.results;

describe('rendering Product Info for the currently selected product', () => {
  beforeEach(() => {
    render(<ProductInfo product={productInfo} selectedStyle={styles[0]} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the category of the current product', () => {
    expect(screen.getByTestId('category')).toHaveTextContent(/pants$/i);
  });

  it('displays the name of the current product', () => {
    expect(screen.getByTestId('product-name')).toHaveTextContent('Morning Joggers');
  });

  it('displays the price of the current product', () => {
    expect(screen.getByTestId('price')).toHaveTextContent('$40');
  });
});
