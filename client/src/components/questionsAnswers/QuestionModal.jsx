import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import randomId from '../../../utils/randomId';
function QuestionModal({ productMetadata, checks, setChecks, setTrigger }) {
  function handleSubmit(e) {
    e.preventDefault();
    const body = e.target.question.value;
    const name = e.target.username.value;
    const email = e.target.email.value;

    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`, {
      body,
      name,
      email,
      product_id: productMetadata.product_id
    }, {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
      .then(() => {
        setTrigger(randomId());
        setChecks({ ...checks, isQuestionModalOpen: false });
      });
  }

  return (
    <Wrapper>
      <div className="modal-backdrop"></div>
      <form onSubmit={handleSubmit}>
        <h2>Ask Your Question</h2>
        <h3>About the {productMetadata.productName}</h3>
        <label htmlFor="question">
          Your Question*:
          <textarea id="question" maxLength={1000} name="question" required />
        </label>
        <label htmlFor="username">
          Your Nickname*:
          <input type="textbox" id="username" maxLength={60} placeholder="Example: jackson11!" name="username" required />
        </label>
        <small>For privacy reasons, do not use your full name or email address.</small>
        <label htmlFor="email">
          Your email*:
          <input type="email" id="email" maxLength={60} placeholder="Example: jack@email.com" name="email" required />
        </label>
        <small>For authentication reasons, you will not be emailed.</small>

        <button type="submit">submit</button>
        <IoClose onClick={() => setChecks({ ...checks, isQuestionModalOpen: false })} className="close-button" />
      </form>
    </Wrapper>
  );
}

export default QuestionModal;

const Wrapper = styled.div`
  isolation: isolate;
  & .modal-backdrop {
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: black;
    opacity: 0.1;
    margin: 0;
    padding: 0;
  }
  & form {
    position: absolute;
    top: 0;
    left: 0;
    background: whitesmoke;
    width: 100%;
    height: min-content;
    padding: 2rem;
    margin: 100px 0;
    box-shadow: 2px 2px 10px #bbb;
    border-radius: 4px;
  }
  .close-button {
    position: absolute;
    top:0;
    right:0;
    transform: scale(2);
    margin: 20px;
  }
  input, textarea {
    display: block;
  }
`;
