import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import styled from 'styled-components';
import Ratings from './Ratings.jsx';

const Card = styled.div`
  min-width: 310px;
  min-height: min-content;
  background: white;
  border-radius: 10px;
  display: inline-block;
  margin: 0 5px;
  position: relative;
  padding: 8px;
  box-shadow: 2px 2px 5px rgba(0 0 0 / 12%);
`;

const Img = styled.img`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 310px;
  height: 280px;
  object-fit: cover;
  cursor: pointer;
`;

const Name = styled.p`
  padding: 0px 0px 1px 8px;
  font-weight: 900;
`;

const Price = styled.p`
  padding: 1px 0px 0px 9px;
  font-size: 12px;
`;

const Category = styled.p`
  padding-left: 9px;
  padding-top: 2px;
  font-size: 13px;
`;

const Button = styled.div`
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 10px;
  color: #d9d9d9;
`;

function OutfitList({ slide, deleteOutfit, pageChange }) {
  const deleteHandler = () => {
    deleteOutfit(slide.id);
  };

  return (
    <Card>
      <Button>
        <TiDeleteOutline size={25} onClick={deleteHandler} />
      </Button>
      <Img src={slide.url} loading="lazy" onClick={() => pageChange(slide.id)} />
      <Category>{slide.category}</Category>
      <Name onClick={() => pageChange(slide.id)}>{slide.name}</Name>
      <Price>
        $
        {slide.price}
      </Price>
      <Ratings rating={slide?.avg} />
    </Card>
  );
}

export default OutfitList;
