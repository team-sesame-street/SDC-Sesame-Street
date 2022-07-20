import React from 'react';
import {
  render, screen, cleanup, fireEvent, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../../../src/components/overview/Sidebar.jsx';
import product from './ProductDataTest.js';
import productInfo from './ProductInfoDataTest.js';

const styles = product.results;
const setSelectedStyle = jest.fn();

describe('rendering the Sidebar correctly for the currently selected product', () => {
  beforeEach(() => {
    render(
      <Sidebar
        product={productInfo}
        selectedStyle={styles[0]}
        styles={styles}
        setSelectedStyle={setSelectedStyle}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('correctly displays the product information of the current product', () => {
    expect(screen.getByTestId('category')).toHaveTextContent(/pants$/i);
    expect(screen.getByTestId('product-name')).toHaveTextContent('Morning Joggers');
    expect(screen.getByTestId('price')).toHaveTextContent('$40');
  });

  it('correctly renders the Style Selector', () => {
    const thumbnails = screen.getAllByRole('img');
    expect(thumbnails).toHaveLength(6);
    const element = screen.getByTestId('selected-style-name');
    expect(element).toHaveTextContent('BLACK');
    fireEvent(
      screen.getByAltText('Goldenrod'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );
    expect(setSelectedStyle).toHaveBeenCalledTimes(1);
  });

  // still need to write tests for Checkout section
});
