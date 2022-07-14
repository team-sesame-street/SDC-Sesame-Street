import React from 'react';
import {
  render, screen, cleanup, fireEvent, act,
} from '@testing-library/react';
import { toBeVisible, toBeInTheDocument } from '@testing-library/jest-dom';
import ExpandedImage from '../../../src/components/overview/Img_Expanded.jsx';

const images = require('./ImagesDataTest.js').photos;
/*
images, currImgIndex, setCurrImgIndex, setExpandedView,
*/
describe('rendering Expanded View', () => {
  const setCurrImgIndex = jest.fn();
  const setExpandedView = jest.fn();

  beforeEach(() => {
    render(<ExpandedImage
      images={images}
      currImgIndex={2}
      setCurrImgIndex={setCurrImgIndex}
      setExpandedView={setExpandedView}
    />);
  });

  afterEach(() => {
    cleanup();
  });

  it('displays a single image', () => {
    const photos = screen.getAllByRole('img');
    expect(photos).toHaveLength(1);
  });

  it('has no effect when the symbol representing the currently selected img is clicked on', () => {
    fireEvent(
      screen.getByTestId('inactive-circle'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(setCurrImgIndex).not.toHaveBeenCalled();
    expect(setExpandedView).not.toHaveBeenCalled();
  });

  it('invokes once a fn that will select a new image when another symbol is clicked', () => {
    const symbols = screen.getAllByTestId('active-circle');
    const target = symbols[0];
    fireEvent(
      target,
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(setCurrImgIndex).toHaveBeenCalledTimes(1);
    expect(setExpandedView).not.toHaveBeenCalled();
  });

  it('invokes once a fn that will exit the expanded view when the exit btn is clicked', () => {
    fireEvent(screen.getByTestId('exit-expanded-btn'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(setCurrImgIndex).toHaveBeenCalledTimes(1);
    expect(setExpandedView).toHaveBeenCalledTimes(1);
  });
});
