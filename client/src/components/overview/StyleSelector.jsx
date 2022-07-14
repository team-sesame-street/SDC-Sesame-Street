import React from 'react';
import PropTypes from 'prop-types';

function StyleSelector({ styles, selectedStyle, setSelectedStyle }) {
  return (
    <div>
      <h2>Style Selector</h2>
      <p>
        <strong>STYLE &gt; </strong>
        <span data-testid="selected-style-name">{selectedStyle.name ? selectedStyle.name.toUpperCase() : null}</span>
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

StyleSelector.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })),
    skus: PropTypes.objectOf(PropTypes.shape({
      quantity: PropTypes.number,
      size: PropTypes.oneOf(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
    })),
  })),
  selectedStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })),
    skus: PropTypes.objectOf(PropTypes.shape({
      quantity: PropTypes.number,
      size: PropTypes.oneOf(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
    })),
  }),
  setSelectedStyle: PropTypes.func.isRequired,
};

StyleSelector.defaultProps = {
  styles: PropTypes.array.isRequired,
  selectedStyle: PropTypes.object.isRequired,
};

export default StyleSelector;
