import React from 'react';
import styled from 'styled-components';

function Button(props) {
  return (
    <Wrapper {...props}>
      {props.children}
    </Wrapper>
  )
}

const Wrapper = styled.button`
    height: 3rem;
    padding: 0 1rem;
    justify-content: flex-start;
    text-transform: uppercase;
    font-weight: 800;
    background: #201d1a;
    border: none;
    color: #f2dcc7;
    border-radius: 4px;
    margin-right: 10px;
    margin-top: 15px;
    cursor: pointer;
    transition: all 100ms ease-in-out;

    &:hover {
      color: #faf5f3;
      background: #585653;
      transition: all 200ms ease-in-out;
      transform: translateY(2px 2px);
    }
    &:active {
      background: #3e3d3b;
    }

    &:disabled {
      background: grey;
      color: white;
      opacity: 0.25;
    }

    @media(max-width: 500px) {
      flex: 1;
      padding: 0 2rem;
      height: 4rem;
    }

`;

export default Button;
