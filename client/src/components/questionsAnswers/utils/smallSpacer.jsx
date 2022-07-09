import React from 'react';
import styled from 'styled-components';

function Spacer() {
  return (
    <Wrapper>
      •
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-block;
  width: 1rem;
  text-align: center;
`;

export default Spacer;
