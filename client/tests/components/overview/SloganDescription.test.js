import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SloganDescription from '../../../src/components/overview/SloganDescription.jsx';
import productInfo from './ProductInfoDataTest.js';

describe('rendering Features for the currently selected product', () => {
  beforeEach(() => {
    render(<SloganDescription product={productInfo} />);
  });

  afterEach(() => {
    cleanup();
  });

  const description = "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.";
  const descriptionDuplicated = description.concat(' ', description, ' ', description);

  it('displays a feature of the current product', () => {
    expect(screen.getByTestId('slogan')).toHaveTextContent('Make yourself a morning person');
    expect(screen.getAllByTestId('description')[0]).toHaveTextContent(descriptionDuplicated);
  });
});
