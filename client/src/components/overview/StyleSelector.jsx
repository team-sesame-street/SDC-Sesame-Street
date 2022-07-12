import React from 'react';

function StyleSelector({ styles, selectedStyle, setSelectedStyle }) {
  return (
    <div>
      <h2>Style Selector</h2>
      <p>
        <strong>STYLE &gt; </strong>
        {selectedStyle.name ? selectedStyle.name.toUpperCase() : null}
      </p>
      <div>
        {styles.map((style) => {
          const styling = {
            opacity: style.style_id === selectedStyle.style_id ? 1 : 0.4,
            height: '50px',
            width: '50px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '1px solid black',
          };

          return (
            <img
              key={style.style_id}
              src={style.photos[0].thumbnail_url}
              onClick={() => {
                setSelectedStyle(style);
              }}
              alt={style.name}
              style={styling}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StyleSelector;
