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
        {styles.map((style) => (
          <ThumbnailWrapper key={style.style_id}>
            <BsFillCheckCircleFill className="checkmark" style={{ visibility: style.style_id === selectedStyle.style_id ? 'visible' : 'hidden' }} />
            <Thumbnail
              src={style.photos[0].thumbnail_url}
              onClick={() => {
                setSelectedStyle(style);
              }}
              alt={style.name}
            />
          </ThumbnailWrapper>
        ))}
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
      size: PropTypes.string,
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
      size: PropTypes.string,
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
  & .checkmark {
    width: minmax(2px, 2vw);
    top: 0.5vh;
    right: 0.5vh;
    color: black;
    border: white;
    position: absolute;
    zIndex: 10;
    user-select: none;
  }
`;

const Thumbnail = styled.img`
  object-fit: cover;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid black;
  opacity: 0.6;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: 1;
  }
  @media(max-width:500px) {
    width: 60px;
    height: 60px;
  }
`;
