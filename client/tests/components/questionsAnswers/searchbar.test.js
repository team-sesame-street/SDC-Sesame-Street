import React from 'react';

import { render, cleanup } from '@testing-library/react';
import { toHaveAttribute, toHaveValue } from '@testing-library/jest-dom';
import SearchBar from '../../../src/components/questionsAnswers/SearchBar.jsx';
import { searchTerm } from './qadata.js';

afterEach(() => {
  cleanup();
});

test('This should show a placeholder text in the Searchbar', () => {
  const setSearchTerm = jest.fn();
  const { getByTestId } = render(
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />,
  );

  const placeholder = 'Have a question? Search for answers…';
  const el = getByTestId('qa-searchbar');
  expect(el).toHaveAttribute('placeholder', placeholder);
});

test('This should set the controlled value of the Searchbar based on the state', () => {
  const setSearchTerm = jest.fn();
  const { getByTestId } = render(
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />,
  );

  const el = getByTestId('qa-searchbar');
  expect(el).toHaveValue(searchTerm);
});
