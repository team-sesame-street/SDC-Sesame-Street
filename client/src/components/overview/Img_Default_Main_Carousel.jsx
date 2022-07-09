import React from 'react';

function MainImage({selectedImg}) {
  if (Object.keys(selectedImg).length > 0) {
    return (
      <div>
        <h2>Main Image Carousel</h2>
        <img src={selectedImg.url} alt="A representation of this product" />
      </div>
    );
  }
}

export default MainImage;