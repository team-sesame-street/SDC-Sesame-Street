/**
 * @jest-environment jsdom
 */
import React from 'react';

import QaBox from '../../../src/components/questionsAnswers/QaBox.jsx';

import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument, toBeEmptyDOMElement, toBeVisible, toHaveFocus, toHaveAttribute, toHaveValue, toBeRequired } from '@testing-library/jest-dom';

const {questions, productMetadata, checks, setChecks, searchTerm, setSearchTerm} = require('./qadata.js');

afterEach(() => {
  cleanup();
});

test('This should render the Question and Answer component', () => {
  render(<QaBox id={40345}/>);
  const el = screen.getByTestId('qa-component');
  expect(el).toBeInTheDocument();
});
