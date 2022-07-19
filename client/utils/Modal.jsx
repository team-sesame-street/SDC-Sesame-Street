import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';

function Modal({ children, cb }) {
  return (
    <Wrapper className="modal">
      <Backdrop />
      <ChildrenWrapper>
        {children}
        <IoClose onClick={() => cb()} className="close-button" />
      </ChildrenWrapper>
    </Wrapper>
  );
}

export default Modal;

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
  width: 40%;
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
    margin: 0;
    width: 100%;
    height: 100%;
  }

  & .nicknameAndemail {
    display: flex;
    gap: 10px;
    @media(max-width: 500px) {
      flex-direction: column;
      gap: 0;
    }
  }

  & input[type="textbox"], input[type="email"] {
    width: 100%;
    height: 3rem;
    border: 1px solid #ddd;
    &:hover {
      border: 1px solid #bbb;
    }
  }

  & textarea {
    width: 100%;
    height: 5rem;
    resize: none;
    border: 1px solid #ddd;
    &:hover {
      border: 1px solid #bbb;
    }
    @media(max-width: 500px) {
      height: 8rem;
    }
  }

  label {
    display: inline-block;
    width: 100%;
    margin-top: 0.5rem;
    & small {
    font-style: italic;
    }
  }

  .close-button {
     position: absolute;
     top:0;
     right:0;
     transform: scale(2);
     z-index: 999;
     margin: 40px;
     cursor: pointer;

     &:hover {
      opacity: 0.65;
     }
   }
`;