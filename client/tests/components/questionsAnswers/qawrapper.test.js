/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument, toBeEmptyDOMElement, toBeVisible, toHaveFocus, toHaveAttribute, toHaveValue, toBeRequired } from '@testing-library/jest-dom';
import QaWrapper from '../../../src/components/questionsAnswers/QAWrapper.jsx';
import QuestionModal from '../../../src/components/questionsAnswers/QuestionModal.jsx';

const {questions, productMetadata, checks, setChecks, searchTerm, setSearchTerm} = require('./qadata.js');

afterEach(() => {
  cleanup();
});

test('This should render the QA wrapper', () => {
  render(<QaWrapper questions={questions} productMetadata={productMetadata} checks={checks} setChecks={setChecks} searchTerm={searchTerm}/>);
  const el = screen.getByTestId('qa-wrapper');
  expect(el).toBeInTheDocument();
});

test('This should update the questions provided a wrong search term', () => {
  let st = 'questionaa 3';
  render(<QaWrapper questions={questions} productMetadata={productMetadata} checks={checks} setChecks={setChecks} searchTerm={st}/>);
  const missingEl = screen.getByTestId('qa-wrapper');
  expect(missingEl).toBeEmptyDOMElement();
});

