import React from 'react';

import { render, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import QaBox from '../../../src/components/questionsAnswers/QaBox.jsx';

afterEach(() => {
  cleanup();
});

test('This should render the Question and Answer component', () => {
  const { getByTestId } = render(<QaBox id={40345} />);
  const el = getByTestId('qa-component');
  expect(el).toBeInTheDocument();
});
