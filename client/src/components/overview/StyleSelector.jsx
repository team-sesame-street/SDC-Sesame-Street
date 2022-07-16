import React from 'react';
import PropTypes from 'prop-types';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function StyleSelector({ styles, selectedStyle, setSelectedStyle }) {
  const styleSelectorGridStyling = {
    // backgroundColor: 'grey',
    display: 'grid',
    width: '36vh',
    // gridTemplateColumns: 'repeat(4, minmax(max-content, 1fr))',
    gridTemplateColumns: 'repeat(4, max-content)',
    gap: '1vh',
    gridAutoRows: 'max-content',
    // margin: 'auto',
  };

  const thumbnailStyling = {
    objectFit: 'cover',
    minWidth: '50px',
    minHeight: '50px',
    width: '8vh',
    height: '8vh',
    borderRadius: '50%',
    border: '1px solid black',
    opacity: 0.6,
  };

  return (
    <div>
      <p>
        <strong>STYLE &gt; </strong>
        <span data-testid="selected-style-name">{selectedStyle.name ? selectedStyle.name.toUpperCase() : null}</span>
      </p>
      <div style={styleSelectorGridStyling}>
        {styles.map((style) => {
          const checkmarkStyling = {
            width: 'minmax(2px, 0.5vh)',
            top: '0.5vh',
            right: '0.5vh',
            color: 'black',
            border: 'white',
            position: 'absolute',
            zIndex: 10,
            visibility: style.style_id === selectedStyle.style_id ? 'visible' : 'hidden',
          };

          return (
            <div style={{ position: 'relative' }}>
              <BsFillCheckCircleFill style={checkmarkStyling} />
              <img
                key={style.style_id}
                src={style.photos[0].thumbnail_url}
                onClick={() => {
                  setSelectedStyle(style);
                }}
                alt={style.name}
                style={thumbnailStyling}
              />
            </div>
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
