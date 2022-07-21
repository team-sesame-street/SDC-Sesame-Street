import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { toBeRequired } from '@testing-library/jest-dom';
import AnswerModal from '../../../src/components/questionsAnswers/AnswerModal.jsx';
import { questions, productMetadata } from './qadata.js';

afterEach(() => {
  cleanup();
});

test('This should check if the answer modal backdrop is shown', () => {
  const setIsAnswerModalOpen = jest.fn();
  const setTrigger = jest.fn();
  const { getByTestId } = render(
    <AnswerModal
      productMetadata={productMetadata}
      setIsAnswerModalOpen={setIsAnswerModalOpen}
      question={questions[0]}
      setTrigger={setTrigger}
    />,
  );
  const el = getByTestId('ans-modal');

  expect(el).toBeVisible();
});


test('This should check if the answer modal backdrop is shown', () => {
  const setIsAnswerModalOpen = jest.fn();
  const setTrigger = jest.fn();
  const { getByTestId } = render(
    <AnswerModal
      productMetadata={productMetadata}
      setIsAnswerModalOpen={setIsAnswerModalOpen}
      question={questions[0]}
      setTrigger={setTrigger}
    />,
  );
  const el = getByTestId('ans-modal');

  expect(el).toBeVisible();
});

test('This should check if the form fields are required', () => {
  const setIsAnswerModalOpen = jest.fn();
  const setTrigger = jest.fn();
  const { getByTestId } = render(
    <AnswerModal
      productMetadata={productMetadata}
      setIsAnswerModalOpen={setIsAnswerModalOpen}
      question={questions[0]}
      setTrigger={setTrigger}
    />,
  );

  const answer = getByTestId('ans-answer');
  expect(answer).toBeRequired();

  const username = getByTestId('ans-username');
  expect(username).toBeRequired();

  const email = getByTestId('ans-email');
  expect(email).toBeRequired();
});
