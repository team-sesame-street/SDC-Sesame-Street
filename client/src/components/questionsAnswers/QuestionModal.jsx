import React, { useEffect } from 'react';
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
        setChecks({ ...checks, isQuestionModalOpen: false });
        setTrigger(randomId());
      })
      .catch((err) => console.error(err));
  }

  return (
    <Wrapper data-testid="question-modal-wrapper">
      <div className="modal-backdrop" data-testid="qa-modal-backdrop"></div>
      <Form onSubmit={handleSubmit} data-testid="qa-question-modal-form">
        <h2>Ask Your Question</h2>
        <h3>About the {productMetadata.productName}</h3>
        <InputWrapper htmlFor="question">
          Your Question*:
          <textarea id="question" maxLength={1000} name="question" required />
        </InputWrapper>
        <div className="nicknameAndemail">
          <InputWrapper htmlFor="username">
            Your Nickname*:
            <input type="textbox" id="username" maxLength={60} placeholder="Example: jackson11!" name="username" required />
            <small>For privacy reasons, do not use your full name or email address.</small>
          </InputWrapper>
          <InputWrapper htmlFor="email">
            Your email*:
            <input type="email" id="email" maxLength={60} placeholder="Example: jack@email.com" name="email" required />
            <small>For authentication reasons, you will not be emailed.</small>
          </InputWrapper>
        </div>
        <SubmitWrapper>
          <button type="submit" data-testid="question-submit-button">submit</button>
        </SubmitWrapper>
        <IoClose onClick={() => {
          setChecks({ ...checks, isQuestionModalOpen: false });
        }} className="close-button" data-testid="close-button" />
      </Form>
    </Wrapper>
  );
}

export default QuestionModal;

const Wrapper = styled.div`
  isolation: auto;
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

const Form = styled.form`
  overflow: auto;
  overscroll-behavior: contain;
  z-index: 1000;
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
    height: 4rem;
    resize: none;
    border: 1px solid #ddd;
    &:hover {
      border: 1px solid #bbb;
    }

    @media(max-width: 500px) {
      height: 8rem;
    }
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  & button {
    height: 3rem;
    padding: 0 1rem;
    justify-content: flex-start;
    text-transform: uppercase;
    font-weight: 700;
    background: none;
    border: 1px solid #222;
    margin-right: 10px;
    margin-top: 15px;
    &:hover {
      color: #eee;
      background: #222;
    }
    &:disabled {
      background: grey;
      color: white;
      opacity: 0.25;
    }

    @media(max-width: 500px) {
      flex: 1;
      padding: 0;
      height: 5rem;
    }
  }

`;

const InputWrapper = styled.label`
  margin-top: 0.5rem;
  & small {
    font-style: italic;
  }
`;