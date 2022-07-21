import React, { useState, useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { VscClose } from 'react-icons/vsc';

function ImageViewer({ photos, cb }) {
  const [index, setIndex] = useState(0);

  function handleNavigation(e) {
    if (e.target.dataset.direction === 'left' && index > 0) {
      setIndex(index - 1);
    } else if (e.target.dataset.direction === 'right' && index < photos.length - 1) {
      setIndex(index + 1);
    }
  }

  useLayoutEffect(() => {
    if (index === 0) {
      document.querySelector('#left').style.visibility = 'hidden';
    } else {
      document.querySelector('#left').style.visibility = 'revert';
    }
    if (index === photos.length - 1) {
      document.querySelector('#right').style.visibility = 'hidden';
    } else {
      document.querySelector('#right').style.visibility = 'revert';
    }
  }, [index]);

  return (
    <>
      <Backdrop onClick={() => cb()} data-testid="image-viewer-backdrop"/>
      <Wrapper data-testid="image-viewer">
        <Button type="button" id="left" data-direction="left" onClick={(e) => handleNavigation(e)}>←</Button>
        <Image src={(photos[index])} />
        <CloseButton onClick={() => cb()}> <VscClose/> </CloseButton>
        <Button type="button" id="right" data-direction="right" onClick={(e) => handleNavigation(e)}>→</Button>
      </Wrapper>
    </>
  );
}

export default ImageViewer;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
`;

const popOut = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
    box-shadow: none;

  }
  to {
    transform: scale(1);
    opacity: 1;
    box-shadow: 2px 2px 10px #bbb;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.2;
  z-index: 1;
  min-width: 100%;
  min-height: 100%;
  animation-name: ${fadeInAnimation};
  animation-duration: 1s;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  box-shadow: none;
  animation-name: ${popOut};
  animation-fill-mode: backwards;
  animation-delay: 220ms;
  animation-duration: 600ms;
`;

const Image = styled.img`
  height: 90%;
  max-width: 90%;
  aspect-ratio: 1/1;
  object-fit: contain;
`;

const Button = styled.button`
  z-index: 10;
  border: 1px solid #222;
  background: #eee;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }

  &#left {
    @media(max-width:500px) {
      justify-self: flex-end;
      width: 40px;
      height: 40px;
      font-size:1rem;
      position: absolute;
      top: 50%;
      left: 0;
  }
  }

  &#right {
    @media(max-width:500px) {
      justify-self: flex-start;
      width: 40px;
      height: 40px;
      font-size:1rem;
      position: absolute;
      top: 50%;
      right: 0;
    }
  }
`;

const CloseButton = styled.button`
  padding: 0;
  line-height: 0;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  width: 75px;
  height: 75px;
  font-size: 2rem;
  cursor: pointer;
  color: #eee;
  border-radius: 50%;
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  &:hover {
    background-color: #222;
  }
`;
