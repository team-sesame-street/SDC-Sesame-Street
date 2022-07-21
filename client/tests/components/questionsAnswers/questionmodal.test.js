import React from 'react';

import QuestionModal from '../../../src/components/questionsAnswers/QuestionModal.jsx';

import { render, cleanup } from '@testing-library/react';
import { toBeVisible, toBeRequired } from '@testing-library/jest-dom';
import { productMetadata, checks } from './qadata.js';

afterEach(() => {
  cleanup();
});

test('This should check if the modal backdrop is shown', () => {
  const { getByTestId } = render(
    <QuestionModal
      productMetadata={productMetadata}
      checks={checks}
    />,
  );

  const el = getByTestId('qa-question-modal-form');
  expect(el).toBeVisible();
});

test('This should check if the form fields are required', () => {
  const { getByTestId } = render(
    <QuestionModal
      productMetadata={productMetadata}
      checks={checks}
    />,
  );

  const question = getByTestId('ques-question');
  expect(question).toBeRequired();

  const username = getByTestId('ques-username');
  expect(username).toBeRequired();

  const email = getByTestId('ques-email');
  expect(email).toBeRequired();
});