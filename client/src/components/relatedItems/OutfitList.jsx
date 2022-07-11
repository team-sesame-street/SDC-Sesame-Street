import React from 'react';

const card = {
  width: '300px',
  height: '365px',
  background: 'white',
  borderRadius: '10px',
  display: 'inline-block',
  marginLeft: '5px',
  marginRight: '5px',
};

const imageStyle = {
  width: '100%',
  height: '75%',
  backgroundColor: 'rgb(240 240 240 / 80%)',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  backgroundSize: 'cover',
  fontSize: '30px',
  color: 'gray',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const titleStyle = {
  margin: '0px 0px 3px 10px',
  fontWeight: '900',
};

const priceStyle = {
  margin: '1px 0px 0px 10px',
  fontSize: '12px',
};

const categoryStyle = {
  marginLeft: '10px',
  fontSize: '13px',
};

const btnStyle = {
  height: '25px',
  width: '285px',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'end',
  color: 'red',
  fontWeight: '800',
  fontSize: '30px',
  marginTop: '6px',
};

function OutfitList({ slide, deleteOutfit }) {
  const deleteHandler = () => {
    deleteOutfit(slide.id);
  };

  return (
    <div style={card}>
      <div onClick={deleteHandler} style={btnStyle}> x </div>
      <div style={{ ...imageStyle, backgroundImage: `url(${slide.url})` }} />
      <p style={categoryStyle}>{slide.category}</p>
      <p style={titleStyle}>{slide.name}</p>
      <p style={priceStyle}>
        $
        {slide.price}
      </p>
    </div>
  );
}

export default OutfitList;
