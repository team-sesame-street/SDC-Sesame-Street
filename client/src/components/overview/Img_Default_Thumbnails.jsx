import React from 'react';

<<<<<<< HEAD
function ImageDefaultThumbnail({ selectedStyle }) {
  if (Object.keys(selectedStyle).length > 0) {
=======
function ImageDefaultThumbnail({images, setSelectedImg}) {
  if (images.length > 0) {
>>>>>>> f8b1d437ec4b5d1df0cf1632caad94599f168e1c
    return (
      <div>
        <h2>Image Default Thumbnail</h2>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumbnail_url}
            alt={`product representation #${index}`}
            onClick={() => {setSelectedImg(image)}}
          />
        ))}
      </div>
    );
  }
}

export default ImageDefaultThumbnail;
