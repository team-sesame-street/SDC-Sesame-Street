import React from 'react';

function ImageDefaultThumbnail({images, currImgIndex, setCurrImgIndex}) {
  if (images.length > 0) {
    return (
      <div>
        <h2>Image Default Thumbnail</h2>
        {images.map((image, index) => {
          const style = {
            opacity: index === currImgIndex ? 1 : 0.4,
          };

          return (<img key={index} src={image.thumbnail_url} style={style} alt={`product representation #${index}`} onClick={() => {setCurrImgIndex(index)}} />
          );
        })}
      </div>
    );
  }
}

export default ImageDefaultThumbnail;
