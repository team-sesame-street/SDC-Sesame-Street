import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toContainHTML, toHaveBeenCalled, toHaveTextContent } from '@testing-library/jest-dom';
import QaListItem from '../../../src/components/questionsAnswers/QaListItem.jsx';
import { questions, productMetadata, checks } from './qadata.js';

beforeEach(() => {
  <QaListItem id={40345} />
});

afterEach(() => {
  cleanup();
});

test('This should update the questions provided a search term', () => {
  const st = 'Question 3';
  const { getByTestId } = render(
    <QaListItem
      result={questions[0]}
      productMetadata={productMetadata}
      checks={checks}
    />,
  );

  const el = getByTestId('qa-listItem');
  const toSearchFor = `<span>${st}</span>`;
  expect(el).toContainHTML(toSearchFor);
});

test('on add answer button click, show answer modal', () => {
  const { getByTestId } = render(
    <QaListItem
      result={questions[0]}
      productMetadata={productMetadata}
      checks={checks}
    />,
  );

  const answerbtn = getByTestId('add-answer-button');
  fireEvent.click(answerbtn);

  const answermod = getByTestId('add-answer-modal');
  expect(answermod).toBeInTheDocument();
});

test('on helpful vote button press, disable helpful vote button', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(
    <button
      type="button"
      data-testid="q-helpful-yes-button"
      onClick={onClick}
      disabled={true}
    >
      123
    </button>,
  );

  const qyesbtn = getByTestId('q-helpful-yes-button');
  fireEvent.click(qyesbtn);

  expect(onClick).not.toHaveBeenCalled();
});

test('on load more answers button press, collapse answers text is shown', ()=> {
  const { getByTestId } = render(
    <QaListItem
      result={questions[0]}
      productMetadata={productMetadata}
      checks={checks}
    />,
  );

  const btn = getByTestId('load-more-answers-btn');
  expect(btn).toHaveTextContent('Load More Answers');
  fireEvent.click(btn);
  expect(btn).toHaveTextContent('Collapse Answers');
});
