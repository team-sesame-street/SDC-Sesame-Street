import React from 'react';
import {
  render, screen, cleanup, fireEvent, act,
} from '@testing-library/react';
import { toBeVisible, toBeInTheDocument } from '@testing-library/jest-dom';
import MainImage from '../../../src/components/overview/Img_Default_Main_Carousel.jsx';
import imagesSet from './ImagesDataTest.js';

const images = imagesSet.photos;

describe('rendering Main Image in Default View', () => {
  afterEach(() => {
    cleanup();
  });

  // dummy functions
  const setCurrImgIndex = jest.fn();
  const setThumbnailIndexMax = jest.fn();
  const setThumbnailIndexMin = jest.fn();
  const setExpandedView = jest.fn();

  it('only displays a single image at a time', () => {
    act(() => {
      render(<MainImage
        images={images}
        currImgIndex={0}
        thumbnailIndexMin={0}
        thumbnailIndexMax={5}
        setCurrImgIndex={setCurrImgIndex}
        setThumbnailIndexMax={setThumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setExpandedView={setExpandedView}
      />);
    });

    const photos = screen.getAllByRole('img');
    expect(photos).toHaveLength(1);
  });

  it('does not show a left arrow with the first image in the set', () => {
    act(() => {
      render(<MainImage
        images={images}
        currImgIndex={0}
        thumbnailIndexMin={0}
        thumbnailIndexMax={5}
        setCurrImgIndex={setCurrImgIndex}
        setThumbnailIndexMax={setThumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setExpandedView={setExpandedView}
      />);
    });

    expect(screen.queryByTestId('left-arrow')).not.toBeInTheDocument();
  });

  it('does not show a right arrow with the last image in the set', () => {
    act(() => {
      render(<MainImage
        images={images}
        currImgIndex={5}
        thumbnailIndexMin={0}
        thumbnailIndexMax={5}
        setCurrImgIndex={setCurrImgIndex}
        setThumbnailIndexMax={setThumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setExpandedView={setExpandedView}
      />);
    });

    expect(screen.queryByTestId('right-arrow')).toBeNull();
  });

  it('shows both left and right arrows with an image in the middle of the set', () => {
    act(() => {
      render(<MainImage
        images={images}
        currImgIndex={3}
        thumbnailIndexMin={0}
        thumbnailIndexMax={5}
        setCurrImgIndex={setCurrImgIndex}
        setThumbnailIndexMax={setThumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setExpandedView={setExpandedView}
      />);
    });

    expect(screen.getByTestId('left-arrow')).toBeVisible();
    expect(screen.getByTestId('right-arrow')).toBeVisible();
  });

  it(
    'invokes once for each of: a fn that changes the current img index, a fn that changes the lowest img index in the thumbnail, and a fn that changes the highest img index in the thumbnail, if the selected img is the first in the thumbnail and the left arrow is clicked',
    () => {
      act(() => {
        render(<MainImage
          images={images}
          currImgIndex={3}
          thumbnailIndexMin={3}
          thumbnailIndexMax={5}
          setCurrImgIndex={setCurrImgIndex}
          setThumbnailIndexMax={setThumbnailIndexMax}
          setThumbnailIndexMin={setThumbnailIndexMin}
          setExpandedView={setExpandedView}
        />);
      });

      fireEvent(
        screen.getByTestId('left-arrow'),
        new MouseEvent('click', {
          bubbles: true,
        }),
      );

      expect(setCurrImgIndex).toHaveBeenCalledTimes(1);
      expect(setThumbnailIndexMax).toHaveBeenCalledTimes(1);
      expect(setThumbnailIndexMin).toHaveBeenCalledTimes(1);
      expect(setExpandedView).not.toHaveBeenCalled();
    },
  );

  it(
    'invokes once for each of: a fn that changes the current img index, a fn that changes the lowest img index in the thumbnail, and a fn that changes the highest img index in the thumbnail, if the selected img is the last img in the thumbnail and the right arrow is clicked',
    () => {
      act(() => {
        render(<MainImage
          images={images}
          currImgIndex={4}
          thumbnailIndexMin={1}
          thumbnailIndexMax={4}
          setCurrImgIndex={setCurrImgIndex}
          setThumbnailIndexMax={setThumbnailIndexMax}
          setThumbnailIndexMin={setThumbnailIndexMin}
          setExpandedView={setExpandedView}
        />);
      });

      fireEvent(
        screen.getByTestId('right-arrow'),
        new MouseEvent('click', {
          bubbles: true,
        }),
      );

      expect(setCurrImgIndex).toHaveBeenCalledTimes(2);
      expect(setThumbnailIndexMax).toHaveBeenCalledTimes(2);
      expect(setThumbnailIndexMin).toHaveBeenCalledTimes(2);
      expect(setExpandedView).not.toHaveBeenCalled();
    },
  );

  it(
    'invokes once for a fn that changes the current img index but invokes neither a fn that changes the lowest img index in the thumbnail nor a fn that changes the highest img index in the thumbnail, if the selected img is in the middle of the thumbnail and the left arrow is clicked',
    () => {
      act(() => {
        render(<MainImage
          images={images}
          currImgIndex={3}
          thumbnailIndexMin={1}
          thumbnailIndexMax={4}
          setCurrImgIndex={setCurrImgIndex}
          setThumbnailIndexMax={setThumbnailIndexMax}
          setThumbnailIndexMin={setThumbnailIndexMin}
          setExpandedView={setExpandedView}
        />);
      });

      fireEvent(
        screen.getByTestId('left-arrow'),
        new MouseEvent('click', {
          bubbles: true,
        }),
      );

      expect(setCurrImgIndex).toHaveBeenCalledTimes(3);
      expect(setThumbnailIndexMax).toHaveBeenCalledTimes(2);
      expect(setThumbnailIndexMin).toHaveBeenCalledTimes(2);
      expect(setExpandedView).not.toHaveBeenCalled();
    },
  );

  it(
    'invokes once for a fn that changes the current img index but invokes neither a fn that changes the lowest img index in the thumbnail nor a fn that changes the highest img index in the thumbnail, if the selected img is in the middle of the thumbnail and the right arrow is clicked',
    () => {
      act(() => {
        render(<MainImage
          images={images}
          currImgIndex={3}
          thumbnailIndexMin={1}
          thumbnailIndexMax={4}
          setCurrImgIndex={setCurrImgIndex}
          setThumbnailIndexMax={setThumbnailIndexMax}
          setThumbnailIndexMin={setThumbnailIndexMin}
          setExpandedView={setExpandedView}
        />);
      });

      fireEvent(
        screen.getByTestId('right-arrow'),
        new MouseEvent('click', {
          bubbles: true,
        }),
      );

      expect(setCurrImgIndex).toHaveBeenCalledTimes(4);
      expect(setThumbnailIndexMax).toHaveBeenCalledTimes(2);
      expect(setThumbnailIndexMin).toHaveBeenCalledTimes(2);
      expect(setExpandedView).not.toHaveBeenCalled();
    },
  );

  it('invokes a fn that change the view from Default to Expanded when the selected img is clicked on', () => {
    act(() => {
      render(<MainImage
        images={images}
        currImgIndex={3}
        thumbnailIndexMin={1}
        thumbnailIndexMax={4}
        setCurrImgIndex={setCurrImgIndex}
        setThumbnailIndexMax={setThumbnailIndexMax}
        setThumbnailIndexMin={setThumbnailIndexMin}
        setExpandedView={setExpandedView}
      />);
    });

    fireEvent(
      screen.getByRole('img'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(setCurrImgIndex).toHaveBeenCalledTimes(4);
    expect(setThumbnailIndexMax).toHaveBeenCalledTimes(2);
    expect(setThumbnailIndexMin).toHaveBeenCalledTimes(2);
    expect(setExpandedView).toHaveBeenCalledTimes(1);
  });
});
