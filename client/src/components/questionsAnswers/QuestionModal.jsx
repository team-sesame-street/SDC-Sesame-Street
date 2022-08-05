import React from 'react';
import axios from 'axios';
import randomId from '../../../utils/randomId';
import Modal from '../../../utils/Modal.jsx';
import Button from '../../../utils/Button.jsx';

import { SubmitWrapper } from './styles/questionmodal.styles';

function QuestionModal({
  productMetadata, checks, setChecks, setTrigger,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const body = e.target.question.value;
    const name = e.target.username.value;
    const email = e.target.email.value;

    axios.post('http://3.101.135.1:3000/qa/questions', {
      body,
      name,
      email,
      product_id: productMetadata.product_id,
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
        <h3>
          About the
          {productMetadata.productName}
        </h3>
        <label htmlFor="question">
          Your Question*:
          <textarea id="question" maxLength={1000} name="question" data-testid="ques-question" required />
        </label>
        <div className="nicknameAndemail">
          <label htmlFor="username">
            Your Nickname*:
            <input type="textbox" id="username" maxLength={60} placeholder="Example: jackson11!" data-testid="ques-username" name="username" required />
            <small>For privacy reasons, do not use your full name or email address.</small>
          </label>
          <label htmlFor="email">
            Your email*:
            <input type="email" id="email" maxLength={60} placeholder="Example: jack@email.com" data-testid="ques-email" name="email" required />
            <small>For authentication reasons, you will not be emailed.</small>
          </label>
        </div>
        <Button type="submit" data-testid="question-submit-button">submit</Button>
      </form>
    </Modal>
  );
}

export default QuestionModal;
