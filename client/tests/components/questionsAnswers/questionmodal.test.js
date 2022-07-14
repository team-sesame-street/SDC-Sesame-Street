/**
 * @jest-environment jsdom
 */
 import React from 'react';

 import QuestionModal from '../../../src/components/questionsAnswers/QuestionModal.jsx';

 import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
 import { toBeInTheDocument, toBeEmptyDOMElement, toBeVisible, toHaveFocus, toHaveAttribute, toHaveValue, toBeRequired } from '@testing-library/jest-dom';

 const {questions, productMetadata, checks, setChecks, searchTerm, setSearchTerm} = require('./qadata.js');

beforeEach(() => {
  <QuestionModal productMetadata={productMetadata} checks={checks} setChecks={setChecks} />
})

afterEach(() => {
  cleanup();
});

test('This should check if the modal backdrop is shown', () => {
  render(<QuestionModal productMetadata={productMetadata} checks={checks}/>);

  let el = screen.getByTestId('qa-modal-backdrop');
  expect(el).toBeVisible();
});

test('This should check if the form fields are required', () => {
  render(<QuestionModal productMetadata={productMetadata} checks={checks} />);

  let question = screen.getByLabelText('Your Question*:');
  expect(question).toBeRequired();

  let username = screen.getByLabelText('Your Nickname*:');
  expect(username).toBeRequired();

  let email = screen.getByLabelText('Your email*:');
  expect(email).toBeRequired();
});