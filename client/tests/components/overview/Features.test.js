import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from '../../../src/components/overview/Features.jsx';
import productInfo from './ProductInfoDataTest.js';

describe('rendering Features for the currently selected product', () => {
  beforeEach(() => {
    render(<Features product={productInfo} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('displays a feature of the current product', () => {
    expect(screen.getAllByTestId('feature')[0]).toHaveTextContent('Fabric:');
    expect(screen.getAllByTestId('feature-value')[0]).toHaveTextContent('100% Cotton');
    expect(screen.getAllByTestId('feature-description')[0]).toHaveTextContent('🌟 Fabric: 100% Cotton');
  });
});
