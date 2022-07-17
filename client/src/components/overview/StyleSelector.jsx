import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function StyleSelector({ styles, selectedStyle, setSelectedStyle }) {
  return (
    <div>
      <p>
        <strong>STYLE &gt; </strong>
        <span data-testid="selected-style-name">{selectedStyle.name ? selectedStyle.name.toUpperCase() : null}</span>
      </p>
      <StyleSelectorGrid>
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
            <ThumbnailWrapper key={style.style_id}>
              <BsFillCheckCircleFill style={checkmarkStyling} />
              <Thumbnail
                src={style.photos[0].thumbnail_url}
                onClick={() => {
                  setSelectedStyle(style);
                }}
                alt={style.name}
              />
            </ThumbnailWrapper>
          );
        })}
      </StyleSelectorGrid>
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

const StyleSelectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  gap: 15px;
  grid-auto-rows: max-content;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  isolation: isolate;
`;

const Thumbnail = styled.img`
  object-fit: cover;
  min-width: 50px;
  min-height: 50px;
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  border: 1px solid black;
  opacity: 0.6;
`;
