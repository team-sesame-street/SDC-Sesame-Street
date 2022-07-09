import React from 'react';

function ImageDefaultThumbnail({ selectedStyle }) {
  if (Object.keys(selectedStyle).length > 0) {
    return (
      <div>
        <h2>Image Default Thumbnail</h2>
        {selectedStyle.photos.map((photo, index) => (
          <img key={index} src={photo.thumbnail_url} alt={`product image #${index}`} />
        ))}
      </div>
    );
  }
}

export default ImageDefaultThumbnail;
