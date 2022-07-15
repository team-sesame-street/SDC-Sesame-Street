import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import convertImageToBase64 from '../../../utils/convertImageToBase64.js';
import randomId from '../../../utils/randomId';

function AnswerModal({ productMetadata, question, setIsAnswerModalOpen, setTrigger }) {
  const [selectedImages, setSelectedImages] = useState(null);
  const [urls, setUrls] = useState([]);

  function handleImages(e) {
    if (e.target.files.length <= 5) {
      setSelectedImages(e.target.files);
      const urlBlobs = [];
      for (let i = 0; i < 5; i += 1) {
        if (e.target.files[i]) {
          urlBlobs.push(URL.createObjectURL(e.target.files[i]));
          setUrls(urlBlobs);
        }
      }
    } else {
      alert("Can't upload more than 5 photos!");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = e.target.answer.value;
    const email = e.target.email.value;
    const name = e.target.username.value;

    const promises = [];
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        promises.push(convertImageToBase64(selectedImages[i]));
      }

      Promise.all(promises).then((blobs) => {
        const cloudPromises = [];
        for (let i = 0; i < blobs.length; i++) {
          cloudPromises.push(
            axios
              .post(`https://api.cloudinary.com/v1_1/drf3dli0i/image/upload`, {
                file: blobs[i],
                upload_preset: "wvbnvl8l",
              })
              .then(({ data }) => data.secure_url)
              .catch((err) => {
                console.error(err);
              })
          )
        };

        Promise.all(cloudPromises)
          .then((photos) => {
            axios
              .post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers`, {
                body,
                name,
                email,
                photos,
              }, {
                headers: {
                  Authorization: process.env.GITKEY,
                },
              })
              .then(() => {
                setTrigger(randomId());
                setIsAnswerModalOpen(false);
              })
          })
          .catch((err) => console.error(err));
      });
    } else {
      axios
        .post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers`, {
          body,
          name,
          email,
          photos: [],
        }, {
          headers: {
            Authorization: process.env.GITKEY,
          },
        })
        .then(() => {
          setTrigger(randomId());
          setIsAnswerModalOpen(false);
        });
    }
  }

  return (
    <Wrapper data-testid="add-answer-modal">
      <div data-testid="ans-modal-backdrop"></div>
      <form onSubmit={handleSubmit}>
        <h2>Submit your Answer</h2>
        <h3>{productMetadata.productName}: {question.question_body}</h3>
        <label htmlFor="answer">
          Your Answer:
          <textarea id="answer" maxLength={1000} name="answer" required />
        </label>
        <label htmlFor="username">
          Your Nickname:
          <input type="textbox" id="username" maxLength={60} placeholder="Example: jack543!" name="username" required />
        </label>
        <small>For privacy reasons, do not use your full name or email address.</small>
        <label htmlFor="email">
          Your email:
          <input type="email" id="email" maxLength={60} placeholder="Example: jack@email.com" name="email" required />
        </label>
        <small>For authentication reasons, you will not be emailed.</small>
        <label htmlFor="file-input" id="file-input-label">Choose up to 5 images to upload (PNG, JPG)</label>
        <input type="file" accept=".jpg, .jpeg, .png, .webp" multiple onChange={handleImages} id="file-input" />
        {selectedImages && (
          <div>
            {
              urls.map((url) => <Thumbnail key={randomId()} src={url} loading="lazy" />)
            }
          </div>
        )}
        <button type="submit">submit</button>
        <IoClose onClick={() => setIsAnswerModalOpen(false)} className="close-button" />
      </form>
    </Wrapper>
  );
}

export default AnswerModal;

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
  & #file-input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }

  & #file-input-label {
    display: inline-block;
    padding: 5px 10px;
    background: #ddd;
  }
  & #file-input-label:hover {
    background: #ccc;
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

const Thumbnail = styled.img`
  display: inline-block;
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 150px;
`;
