import React from 'react';

function StyleSelector({ styles, selectedStyleId, setSelectedStyleId }) {
  return (
    <div>
      <h2>Style Selector</h2>
      <ul>
        {styles.map((style) => (
          style.style_id === selectedStyleId
            ? (
              <li key={style.style_id} onClick={() => {setSelectedStyleId(style.style_id)}}>
                {style.name}
                &nbsp;
                --- Im selected!
              </li>
            )
            : (
              <li key={style.style_id} onClick={() => {setSelectedStyleId(style.style_id)}}>
                {style.name}
              </li>
            )
        ))}
      </ul>
    </div>
  );
}

export default StyleSelector;
