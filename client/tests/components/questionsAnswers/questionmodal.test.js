import React from 'react';

import QuestionModal from '../../../src/components/questionsAnswers/QuestionModal.jsx';

import { render, cleanup } from '@testing-library/react';
import { toBeVisible, toBeRequired } from '@testing-library/jest-dom';
import {productMetadata, checks } from './qadata.js';


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

  const el = getByTestId('qa-modal-backdrop');
  expect(el).toBeVisible();
});

test('This should check if the form fields are required', () => {
  const { getByLabelText } = render(
    <QuestionModal
      productMetadata={productMetadata}
      checks={checks}
    />,
  );

  const question = getByLabelText('Your Question*:');
  expect(question).toBeRequired();

  const username = getByLabelText('Your Nickname*:');
  expect(username).toBeRequired();

  const email = getByLabelText('Your email*:');
  expect(email).toBeRequired();
});