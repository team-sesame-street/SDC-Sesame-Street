import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { toBeInTheDocument, toBeEmptyDOMElement } from '@testing-library/jest-dom';
import QaWrapper from '../../../src/components/questionsAnswers/QAWrapper.jsx';
import {
  questions, productMetadata, checks, searchTerm,
} from './qadata.js';

afterEach(() => {
  cleanup();
});

test('This should render the QA wrapper', () => {
  const setChecks = jest.fn();
  const { getByTestId } = render(
    <QaWrapper
      questions={questions}
      productMetadata={productMetadata}
      checks={checks}
      setChecks={setChecks}
      searchTerm={searchTerm}
    />,
  );
  const el = getByTestId('qa-wrapper');
  expect(el).toBeInTheDocument();
});

test('This should update the questions provided a wrong search term', () => {
  const setChecks = jest.fn();
  const st = 'questionaa 3';
  const { getByTestId } = render(
    <QaWrapper
      questions={questions}
      productMetadata={productMetadata}
      checks={checks}
      setChecks={setChecks}
      searchTerm={st}
    />,
  );
  const missingEl = getByTestId('qa-wrapper');
  expect(missingEl).not.toBeEmptyDOMElement();
});
