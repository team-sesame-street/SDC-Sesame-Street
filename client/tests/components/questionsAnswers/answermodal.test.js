/**
 * @jest-environment jsdom
 */
 import React from 'react';

 import AnswerModal from '../../../src/components/questionsAnswers/AnswerModal.jsx';

 import { render, screen, cleanup } from '@testing-library/react';
 import { toBeRequired } from '@testing-library/jest-dom';

 const {questions, productMetadata, checks, setChecks, searchTerm, setSearchTerm} = require('./qadata.js');

afterEach(() => {
  cleanup();
});

test('This should check if the answer modal backdrop is shown', () => {
  const setIsAnswerModalOpen = jest.fn();
  const setTrigger = jest.fn();
  render(<AnswerModal productMetadata={productMetadata} setIsAnswerModalOpen={setIsAnswerModalOpen} question={questions[0]} setTrigger={setTrigger} />);

  let el = screen.getByTestId('ans-modal-backdrop');
  expect(el).toBeVisible();
});

test('This should check if the form fields are required', () => {
  const setIsAnswerModalOpen = jest.fn();
  const setTrigger = jest.fn();

  render(<AnswerModal productMetadata={productMetadata} setIsAnswerModalOpen={setIsAnswerModalOpen} question={questions[0]} setTrigger={setTrigger} />);

  let answer = screen.getByLabelText('Your Answer:');
  expect(answer).toBeRequired();

  let username = screen.getByLabelText('Your Nickname:');
  expect(username).toBeRequired();

  let email = screen.getByLabelText('Your email:');
  expect(email).toBeRequired();
});