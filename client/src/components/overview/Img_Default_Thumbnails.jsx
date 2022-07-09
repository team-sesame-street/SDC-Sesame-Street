import React from 'react';

function ImageDefaultThumbnail({images, setSelectedImg}) {
  if (images.length > 0) {
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

