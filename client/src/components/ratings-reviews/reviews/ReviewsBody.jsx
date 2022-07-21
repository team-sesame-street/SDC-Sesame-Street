/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import ImageViewer from '../../../../utils/ImageViewer.jsx';

const Thumbnail = styled.img`
  cursor: pointer;
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 100px;
`;

const styles = {
  imageContainer: {
    display: 'flex',
    gap: '20px',
  },
};

export default function ReviewsBody({ reviewBody, reviewImages }) {
  const [focused, setFocus] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [showMore, setShowMore] = useState(false);

  function handleClick(e) {
    const targetId = e.target.id;
    if (targetId === 'thumbnail') {
      setFocus(true);
      setImgUrl(e.target.src);
    }
    if (targetId === 'more') {
      e.preventDefault();
      setShowMore(true);
    }
  }

  return (
    <div>
      {focused && (
        <ImageViewer
          photos={[imgUrl]}
          cb={() => setFocus(false)}
        />
      )}
      {reviewBody.length > 250 && !showMore ? (
        <div>
          {reviewBody.slice(0, 249)}
          <a href="#" id="more" onClick={handleClick}>Show more</a>
        </div>
      ) : (
        <div>
          {reviewBody}
        </div>
      )}
      <div style={styles.imageContainer}>
        {reviewImages.map((image) => (
          <Thumbnail
            key={image.id}
            src={image.url}
            onClick={(e) => handleClick(e)}
            id="thumbnail"
          />
        ))}
      </div>
    </div>
  );
}
