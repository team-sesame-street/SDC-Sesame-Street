import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import convertImageToBase64 from '../../../utils/convertImageToBase64.js';
import randomId from '../../../utils/randomId';

function AnswerModal({ productMetadata, question, setIsAnswerModalOpen, questions, setQuestions }) {
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

    // Convert images to text (base64)
    const convertedImages = [];
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        convertedImages.push(convertImageToBase64(selectedImages[i]));
      }
      // Send those converted images to Cloudinary
      // Cloudinary sends back an array of URLs
      Promise.all(convertedImages)
        .then((blobs) => {
          const cloudPromises = [];
          for (let i = 0; i < blobs.length; i++) {
            cloudPromises.push(
              axios
                .post(`https://api.cloudinary.com/v1_1/drf3dli0i/image/upload`, {
                  file: blobs[i],
                  upload_preset: "wvbnvl8l",
                })
                .then(({ data }) => data.secure_url),
            );
          }
          // Send the array of urls with the POST request to Hack Reactor
          Promise.all(cloudPromises)
            .then((photos) => {
              return axios
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
                  return axios
                    .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers?count=15`, {
                      headers: {
                        Authorization: process.env.GITKEY
                      }
                    })
                    .then(({ data }) => {
                      let formattedData = data.results.map((result) => {
                        console.log(result);
                        return { ...result, id: question.question_id, photos: result.photos?.map(photo => photo.url) }
                      });
                      let quest = questions.find((q) => q.question_id === question.question_id);
                      quest.answers = formattedData;
                      let newQuestionIndex = questions.indexOf(quest);
                      questions.splice(newQuestionIndex, 1, quest);
                      setQuestions([...questions]);
                    });
                  setIsAnswerModalOpen(false);
                });
            });
        })
        .catch((err) => console.error(err));
    } else {
      return axios
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
          return axios
            .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers?count=15`, {
              headers: {
                Authorization: process.env.GITKEY,
              }
            })
            .then(({ data }) => {
              let formattedData = data.results.map((result) => {
                console.log(result);
                return { ...result, id: question.question_id, photos: result.photos?.map(photo => photo.url) }
              });
              let quest = questions.find((q) => q.question_id === question.question_id);
              quest.answers = formattedData;
              let newQuestionIndex = questions.indexOf(quest);
              questions.splice(newQuestionIndex, 1, quest);
              setQuestions([...questions]);


            });
          setIsAnswerModalOpen(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <Wrapper data-testid="add-answer-modal">
      <div className="modal-backdrop" data-testid="ans-modal-backdrop"></div>
      <Form onSubmit={handleSubmit}>
        <h2>Submit your Answer</h2>
        <h3>
          {productMetadata.productName}
          :
          <span className="header-question">{question.question_body}</span>
        </h3>
        <InputWrapper htmlFor="answer">
          Your Answer:
          <textarea id="answer" maxLength={1000} name="answer" required />
        </InputWrapper>
        <div className="nicknameAndemail">
          <InputWrapper htmlFor="username">
            Your Nickname:
            <input type="textbox" id="username" maxLength={60} placeholder="Example: jack543!" name="username" required />
            <small>For privacy reasons, do not use your full name or email address.</small>
          </InputWrapper>
          <InputWrapper htmlFor="email">
            Your email:
            <input type="email" id="email" maxLength={60} placeholder="Example: jack@email.com" name="email" required />
            <small>For authentication reasons, you will not be emailed.</small>
          </InputWrapper>
        </div>
        <InputWrapper htmlFor="file-input" id="file-input-label">
          <input type="file" accept=".jpg, .jpeg, .png, .webp" multiple onChange={handleImages} id="file-input" />
          <small>Click here to add up to 5 images to upload...</small>
        </InputWrapper>
        <ThumbnailWrapper>
          {selectedImages && (
            <div>
              {
                urls.map((url) => <Thumbnail key={randomId()} src={url} loading="lazy" />)
              }
            </div>
          )}
        </ThumbnailWrapper>
        <SubmitWrapper>
          <button type="submit">Submit</button>
        </SubmitWrapper>
        <IoClose onClick={() => setIsAnswerModalOpen(false)} className="close-button" />
      </Form>
    </Wrapper>
  );
}

export default AnswerModal;

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

  & h3 {
    & .header-question {
      margin-left: 5px;
      font-weight: 400;
    }
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

  @media(max-width: 500px) {
    margin: 0;
    width: 100%;
    height: 100%;
  }
`;

const ThumbnailWrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
  padding:  0;
  height: min-content;
  min-height: 100px;
  max-height: 130px;
outline: 1px solid #ddd;
`;

const Thumbnail = styled.img`
  display: inline-block;
  aspect-ratio: 1/1;
  object-fit: cover;
  width: ${100 / 5}%;
  height: 100px;
  padding: 5px;
`;

const InputWrapper = styled.label`
  margin-top: 0.5rem;
  & small {
    font-style: italic;
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