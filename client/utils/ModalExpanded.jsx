import React from 'react';
import styled, { keyframes } from 'styled-components';

function ModalExpanded({ children}) {
  return (
    <Wrapper className="modal">
      <Backdrop />
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </Wrapper>
  );
}

export default ModalExpanded;

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

const Wrapper = styled.div`
  transition: 1s ease-in-out;
  position: absolute;
  isolation: isolate;
  z-index: 500;
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;
  margin: 0;
  padding: 0;
  animation-name: ${fadeInAnimation};
  animation-duration: 1s;
`;

const ChildrenWrapper = styled.div`
  transition: all 0.15s ease-in-out;
  overflow: auto;
  overscroll-behavior: contain;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  width: 90%;
  height: min-content;
  padding: 2.5rem 3.1rem;
  margin: 100px auto;
  box-shadow: 2px 2px 10px #bbb;
  border-radius: 4px;
  animation-name: ${popOut};
  animation-fill-mode: backwards;
  animation-delay: 200ms;
  animation-duration: 500ms;

  & h2 {
    margin: 0.5rem 0 1rem 0;
  }

  @media(max-width: 500px) {
    margin-top: 40%;
    width: 100%;
    height: 50%;
  }

  @media(min-width: 1200px) {
    width: 50%;
    height: max-content;
  }

  label {
    display: inline-block;
    width: 100%;
    margin-top: 0.5rem;
    & small {
    font-style: italic;
    }
  }

  // .exit-icon {
  //    position: absolute;
  //    top:0;
  //    right:0;
  //    transform: scale(2);
  //    z-index: 999;
  //    margin: 40px;
  //    cursor: pointer;

  //    &:hover {
  //     opacity: 0.65;
  //    }
  //  }
`;
