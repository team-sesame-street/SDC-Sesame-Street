import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import randomId from '../../../utils/randomId';
import Modal from '../../../utils/Modal.jsx';

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
    <Modal cb={() => setChecks({ ...checks, isQuestionModalOpen: false })}>
      <form onSubmit={handleSubmit} data-testid="qa-question-modal-form">
        <h2>Ask Your Question</h2>
        <h3>About the {productMetadata.productName}</h3>
        <label htmlFor="question">
          Your Question*:
          <textarea id="question" maxLength={1000} name="question" required />
        </label>
        <div className="nicknameAndemail">
          <label htmlFor="username">
            Your Nickname*:
            <input type="textbox" id="username" maxLength={60} placeholder="Example: jackson11!" name="username" required />
            <small>For privacy reasons, do not use your full name or email address.</small>
          </label>
          <label htmlFor="email">
            Your email*:
            <input type="email" id="email" maxLength={60} placeholder="Example: jack@email.com" name="email" required />
            <small>For authentication reasons, you will not be emailed.</small>
          </label>
        </div>
        <SubmitWrapper>
          <button type="submit" data-testid="question-submit-button">submit</button>
        </SubmitWrapper>
      </form>
    </Modal>
  );
}

export default QuestionModal;

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
