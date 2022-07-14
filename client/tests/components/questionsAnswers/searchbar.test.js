/**
 * @jest-environment jsdom
 */
 import React from 'react';

 import SearchBar from '../../../src/components/questionsAnswers/SearchBar.jsx';
 import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
 import { toBeInTheDocument, toBeEmptyDOMElement, toBeVisible, toHaveFocus, toHaveAttribute, toHaveValue, toBeRequired } from '@testing-library/jest-dom';

 const {questions, productMetadata, checks, setChecks, searchTerm, setSearchTerm} = require('./qadata.js');

afterEach(() => {
  cleanup();
});


// SEARCH BAR

test('This should show a placeholder text in the Searchbar', () => {
  render(<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>);
  let placeholder = "Have a question? Search for answers…";
  let el = screen.getByTestId('qa-searchbar');
  expect(el).toHaveAttribute('placeholder', placeholder);
});

test('This should set the controlled value of the Searchbar based on the state', () => {
  render(<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>);
  // const user = userEvent.setup();
  let el = screen.getByTestId('qa-searchbar');
  // userEvent.type(el, 'abc123');
  expect(el).toHaveValue(searchTerm);
});
