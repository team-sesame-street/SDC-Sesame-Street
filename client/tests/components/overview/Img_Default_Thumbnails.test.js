import React from 'react';
import {
  render, screen, cleanup, fireEvent, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import MainImage from '../../../src/components/overview/Img_Default_Thumbnails.jsx';
import imagesSet from './ImagesDataTest.js';

const images = imagesSet.photos;

describe('rendering Thumbnail in Default View', () => {
  // dummy functions
  const setCurrImgIndex = jest.fn();
  const setThumbnailIndexMax = jest.fn();
  const setThumbnailIndexMin = jest.fn();

  beforeEach(() => {
    render(<MainImage
      images={images.concat(images)}
      currImgIndex={0}
      thumbnailIndexMin={0}
      thumbnailIndexMax={6}
      setCurrImgIndex={setCurrImgIndex}
      setThumbnailIndexMax={setThumbnailIndexMax}
      setThumbnailIndexMin={setThumbnailIndexMin}
    />);
  });

  afterEach(() => {
    cleanup();
  });

  it('displays an image that is within the range of the thumbnail', () => {
    expect(screen.queryByAltText('product representation #0')).toBeVisible();
  });

  it('displays images within the range of the thumbnail', () => {
    const thumbnails = screen.getAllByRole('img');
    expect(thumbnails).toHaveLength(7);
  });

  it('does not show images beyond the range of the thumbnail', () => {
    expect(screen.queryByAltText('product representation #9')).not.toBeInTheDocument();
  });

  it('invokes once a fn that would change the currently selected img if another img is clicked on', () => {
    fireEvent(
      screen.getByAltText('product representation #6'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(setCurrImgIndex).toHaveBeenCalledTimes(1);
    expect(setThumbnailIndexMax).not.toHaveBeenCalled();
    expect(setThumbnailIndexMin).not.toHaveBeenCalled();
  });

  it('has no effect if the up arrow is clicked on when the selected img is the first in the set', () => {
    fireEvent(
      screen.getByTestId('up-arrow-active'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(setCurrImgIndex).toHaveBeenCalledTimes(1);
    expect(setThumbnailIndexMax).not.toHaveBeenCalled();
    expect(setThumbnailIndexMin).not.toHaveBeenCalled();
  });

  it('invokes two functions, once each, that would slide the thumbnail up if the up arrow is clicked and the first img in the thumbnail is not the first in the img set', () => {
    act(() => {
      cleanup();
      render(<MainImage
        images={images.concat(images)}
        currImgIndex={8}
        thumbnailIndexMin={2}
        thumbnailIndexMax={9}
        setCurrImgIndex={setCurrImgIndex}
        setThumbnailIndexMax={setThumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
      />);
    });

    fireEvent(
      screen.getByTestId('up-arrow-active'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(setCurrImgIndex).toHaveBeenCalledTimes(1);
    expect(setThumbnailIndexMax).toHaveBeenCalledTimes(1);
    expect(setThumbnailIndexMin).toHaveBeenCalledTimes(1);
  });
});
