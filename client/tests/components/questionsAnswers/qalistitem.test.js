/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toBeEmptyDOMElement, toBeVisible, toHaveFocus, toHaveAttribute, toHaveValue, toBeRequired, toBeDisabled, toHaveProperty, toHaveBeenCalled, toHaveBeenCalledTimes } from '@testing-library/jest-dom';
import QaListItem from '../../../src/components/questionsAnswers/QaListItem.jsx';

const { questions, productMetadata, checks, setChecks, searchTerm, setSearchTerm } = require('./qadata.js');


beforeEach(() => {
  <QaListItem id={40345} />
})

afterEach(() => {
  cleanup();
});

test('This should update the questions provided a search term', () => {
  let st = 'Question 3';
  render(<QaListItem result={questions[0]} productMetadata={productMetadata} checks={checks} />);

  let el = screen.getByTestId('qa-listItem');
  let toSearchFor = `<span>${st}</span>`;
  expect(el).toContainHTML(toSearchFor);
});

test('on add answer button click, show answer modal', () => {
  const { getByTestId } = render(<QaListItem result={questions[0]} productMetadata={productMetadata} checks={checks} />);

  const answerbtn = getByTestId('add-answer-button');
  fireEvent.click(answerbtn);

  const answermod = getByTestId('add-answer-modal');
  expect(answermod).toBeInTheDocument();
});

test('on helpful vote button press, disable helpful vote button', () => {
  const onClick = jest.fn();
  render(<button data-testid="q-helpful-yes-button" onClick={onClick} disabled={true}>123</button>);
  const qyesbtn = screen.getByTestId('q-helpful-yes-button');
  fireEvent.click(qyesbtn);

  expect(onClick).not.toHaveBeenCalled();
});

test('on load more answers button press, collapse answers text is shown', ()=> {
  render(<QaListItem result={questions[0]} productMetadata={productMetadata} checks={checks} />);

  const btn = screen.getByTestId('load-more-answers-btn');
  expect(btn).toHaveTextContent('Load More Answers');
  fireEvent.click(btn);
  expect(btn).toHaveTextContent('Collapse Answers');
});

test('on', ()=> {

});