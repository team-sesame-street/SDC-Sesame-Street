import React from 'react';
import styled from 'styled-components';
import QaListItem from './QaListItem.jsx';

function QaBox() {
  return (
    <Wrapper>
      <h2>Questions And Answers</h2>
      <div>
        <QaListItem />
        <QaListItem />
        <QaListItem />
      </div>
    </Wrapper>
  );
}

export default QaBox;

const Wrapper = styled.div`
  border: 1px solid red;
`;
