/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';
import convertImageToBase64 from '../../../utils/convertImageToBase64.js';
import randomId from '../../../utils/randomId';
import Modal from '../../../utils/Modal.jsx';
import Button from '../../../utils/Button.jsx';

import {
  FileInputWrapper,
  ThumbnailWrapper,
  Thumbnail,
  SubmitWrapper,
} from './styles/answermodal.styles';

function AnswerModal({
  productMetadata, question, setIsAnswerModalOpen, questions, setQuestions,
}) {
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
      for (let i = 0; i < selectedImages.length; i += 1) {
        convertedImages.push(convertImageToBase64(selectedImages[i]));
      }
      // Send those converted images to Cloudinary
      // Cloudinary sends back an array of URLs
      Promise.all(convertedImages)
        .then((blobs) => {
          const cloudPromises = [];
          for (let i = 0; i < blobs.length; i += 1) {
            cloudPromises.push(
              axios
                .post('https://api.cloudinary.com/v1_1/drf3dli0i/image/upload', {
                  file: blobs[i],
                  upload_preset: 'wvbnvl8l',
                })
                .then(({ data }) => data.secure_url),
            );
          }
          // Send the array of urls with the POST request to Hack Reactor
          Promise.all(cloudPromises)
            .then((photos) => axios
              .post(`http://3.101.135.1:3000/qa/questions/${question.question_id}/answers`, {
                body,
                name,
                email,
                photos,
              }, {
                headers: {
                  Authorization: process.env.GITKEY,
                },
              })
              .then(() => axios
                .get(`http://3.101.135.1:3000/qa/questions/${question.question_id}/answers?count=15`, {
                  headers: {
                    Authorization: process.env.GITKEY,
                  },
                })
                .then(({ data }) => {
                  setIsAnswerModalOpen(false);
                  const formattedData = data.results.map((result) => ({ ...result, id: question.question_id, photos: result.photos?.map((photo) => photo.url) }));
                  const quest = questions.find((q) => q.question_id === question.question_id);
                  quest.answers = formattedData;
                  const newQuestionIndex = questions.indexOf(quest);
                  questions.splice(newQuestionIndex, 1, quest);
                  setQuestions([...questions]);
                })));
        })
        .catch((err) => console.error(err));
    } else {
      return axios
        .post(`http://3.101.135.1:3000/qa/questions/${question.question_id}/answers`, {
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
          setIsAnswerModalOpen(false);
          return axios
            .get(`http://3.101.135.1:3000/qa/questions/${question.question_id}/answers?count=15`, {
              headers: {
                Authorization: process.env.GITKEY,
              },
            })
            .then(({ data }) => {
              const formattedData = data.results.map((result) => ({ ...result, id: question.question_id, photos: result.photos?.map((photo) => photo.url) }));
              const quest = questions.find((q) => q.question_id === question.question_id);
              quest.answers = formattedData;
              const newQuestionIndex = questions.indexOf(quest);
              questions.splice(newQuestionIndex, 1, quest);
              setQuestions([...questions]);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <Modal cb={() => setIsAnswerModalOpen(false)}>
      <form onSubmit={handleSubmit} data-testid="ans-modal">
        <h2>Submit your Answer</h2>
        <h3>
          {productMetadata.productName}
          :
          <span className="header-question">{question.question_body}</span>
        </h3>
        <label htmlFor="answer">
          Your Answer:
          <textarea id="answer" maxLength={1000} name="answer" data-testid="ans-answer" required />
        </label>
        <div className="nicknameAndemail">
          <label htmlFor="username">
            Your Nickname:
            <input type="textbox" id="username" maxLength={60} placeholder="Example: jack543!" data-testid="ans-username" name="username" required />
            <small>For privacy reasons, do not use your full name or email address.</small>
          </label>
          <label htmlFor="email">
            Your email:
            <input type="email" id="email" maxLength={60} placeholder="Example: jack@email.com" data-testid="ans-email" name="email" required />
            <small>For authentication reasons, you will not be emailed.</small>
          </label>
        </div>
        <FileInputWrapper htmlFor="file-input" id="file-input-label">
          <input type="file" accept=".jpg, .jpeg, .png, .webp" multiple onChange={handleImages} id="file-input" />
          <small>Click here to add up to 5 images to upload...</small>
        </FileInputWrapper>
        <ThumbnailWrapper>
          {selectedImages && (
            <div>
              {
                urls.map((url) => <Thumbnail data-testid="ans_thumbnail" key={randomId()} src={url} loading="lazy" />)
              }
            </div>
          )}
        </ThumbnailWrapper>
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}

export default AnswerModal;
