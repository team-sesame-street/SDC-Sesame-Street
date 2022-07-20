/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { BiPlus } from 'react-icons/bi';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70px',
    height: '70px',
    backgroundColor: 'lightGray',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '5px',
  },
};

const Thumbnail = styled.img`
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin-top: 5px;
`;

export default function UploadPhotos({
  selectedImage, setSelectedImage, originalImage, setOriginalImage,
}) {
  const hiddenFileInput = React.useRef(null);

  function handleClick() {
    hiddenFileInput.current.click();
  }

  function handleChange(event) {
    setOriginalImage([...originalImage, event.target.files]);
    setSelectedImage([...selectedImage, URL.createObjectURL(event.target.files[0])]);
  }

  function handleError() {
    alert('Error uploading');
    const newImageArr = [...selectedImage];
    newImageArr.pop();
    setSelectedImage(newImageArr);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {selectedImage.length < 5 && (
          <div style={styles.container}>
            <BiPlus
              type="regular"
              name="photos"
              size="50px"
              onClick={() => handleClick()}
            />
            <input
              type="file"
              ref={hiddenFileInput}
              name="myImage"
              style={{ display: 'none' }}
              onChange={(event) => handleChange(event)}
            />
          </div>
        )}
        <div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {selectedImage.map((image) => (
              <div>
                <Thumbnail onError={() => handleError()} src={image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
