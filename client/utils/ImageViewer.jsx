import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function ImageViewer({ photos, cb }) {
  const [index, setIndex] = useState(0);

  function handleNavigation(e) {
    if (e.target.dataset.direction === 'left' && index > 0 ) {
      setIndex(index - 1);
    } else if (e.target.dataset.direction === 'right' && index < photos.length - 1) {
      setIndex(index + 1);
    }
  }

  useEffect(() => {
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
      <Backdrop onClick={() => cb()} />
      <Wrapper>
        <Button type="button" id="left" data-direction="left" onClick={(e) => handleNavigation(e)}>←</Button>
        <Image src={(photos[index])} />
        <CloseButton onClick={() => cb()}> ⨯ </CloseButton>
        <Button type="button" id="right" data-direction="right" onClick={(e) => handleNavigation(e)}>→</Button>
      </Wrapper>
    </>
  );
}

export default ImageViewer;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.2;
  z-index: 1;
  min-width: 100%;
  min-height: 100%;
`;

const Wrapper = styled.div`
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
`;

const Image = styled.img`
  height: 90%;
  max-width: 90%;
  aspect-ratio: 1/1;
  object-fit: contain;
  padding: 25px;
`;

const Button = styled.button`
  z-index: -2;
  border: 1px solid #222;
  background: white;
  border-radius: 50%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  width: 100px;
  height: 100px;
  font-size: 4rem;
  margin-top: -1rem;
`;
