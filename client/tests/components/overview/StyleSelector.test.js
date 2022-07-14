import React from 'react';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { toHaveTextContent } from '@testing-library/jest-dom';
import StyleSelector from '../../../src/components/overview/StyleSelector.jsx';

const product = require('./ProductDataTest.js');

describe('rendering StyleSelector', () => {
  const setSelectedStyle = jest.fn();

  beforeEach(() => {
    const styles = product.results;
    let selectedStyle = styles[0];

    render(
      <StyleSelector
        styles={styles}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should display all styles available for the current product', () => {
    const thumbnails = screen.getAllByRole('img');
    expect(thumbnails).toHaveLength(6);
  });

  it('should display the name of the selected style', () => {
    const element = screen.getByTestId('selected-style-name');
    expect(element).toHaveTextContent('BLACK');
  });

  it('should invoke a function that selects a new style when another image is clicked', () => {
    fireEvent(
      screen.getByAltText('Goldenrod'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );
    expect(setSelectedStyle).toHaveBeenCalled();
  });
});
