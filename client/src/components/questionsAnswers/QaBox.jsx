import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import QaListItem from './QaListItem.jsx';

function QaBox({ id }) {
  const [currProduct, setCurrProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${id}`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
        .then(({ data }) => {
          setCurrProduct(data);
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <Wrapper>
      <h2>Questions And Answers</h2>
      <div>
        {!isLoading && currProduct.results.map((result) => (
          <QaListItem key={result.question_id} result={result} />
        ))}
      </div>
    </Wrapper>
  );
}

export default QaBox;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0 auto;
  width: 70%;
`;
