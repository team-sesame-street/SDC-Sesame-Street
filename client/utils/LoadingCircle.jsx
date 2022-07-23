import React from 'react';
import styled, { keyframes } from 'styled-components';
import { VscLoading } from 'react-icons/vsc';

function LoadingCircle() {
  return (
    <Wrapper>
      <VscLoading />
    </Wrapper>
  );
}

export default LoadingCircle;

const rotatingAnimation = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
`;

const Wrapper = styled.div`
  & * {
    margin: 20% auto;
    animation: ${rotatingAnimation} 1s ease-in-out infinite;
    transform-origin: center;
    width: 30px;
    height: 30px;
  }
`;
