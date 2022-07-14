import React from 'react'
import Ratings from '../../src/components/relatedItems/Ratings.jsx'
import MainCarousel from '../../src/components/relatedItems/MainCarousel.jsx'
import RelatedItems from '../../src/components/relatedItems/RelatedItems.jsx'
import data from './info.js'
import reviews from './reviews.js'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

test('This should render the main carousel component', () => {
  render(<MainCarousel id={40346}/>);
  const element = screen.getByTestId('main');
  expect(element).toBeInTheDocument();
});

test('This should render product carousel component', () => {
  render(<Ratings rating={3}/>)
  const element = screen.getByTestId('ratings');
  expect(element).toBeInTheDocument();
});

test('This should render the related items component', async () => {
  render(<RelatedItems slides={data} id={40346} reviews={reviews}/>);
  const element = screen.getByTestId('related');
  expect(element).toBeInTheDocument();
});

test('This should check if the arrows are visible or not', () => {
  render(<RelatedItems slides={data} id={40346} reviews={reviews}/>);
  expect(screen.getByTestId('left-arrow')).not.toBeVisible();
  expect(screen.getByTestId('right-arrow')).toBeVisible();
});

test('Check if a price is being displayed for cards on carousel', () => {
  render(<RelatedItems slides={data} id={40346} reviews={reviews}/>);
  const results = screen.getAllByTestId('label')
  expect(results[0]).toHaveTextContent('$')
});
