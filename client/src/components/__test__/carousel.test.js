
/**
 * @jest-environment jsdom
 */

import React from 'react'
import Ratings from '../relatedItems/Ratings.jsx'
import MainCarousel from '../relatedItems/MainCarousel.jsx'
import { render, screen, cleanup } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom';

afterEach(() => {
  cleanup()
})

test('This should render product carousel component', () => {
  render(<Ratings rating={3}/>)
  const element = screen.getByTestId('ratings')
  expect(element).toBeInTheDocument()
});

test('This should render the main carousel component', () => {
  render(<MainCarousel id={40346}/>)
  const element = screen.getByTestId('main')
  expect(element).toBeInTheDocument()
});