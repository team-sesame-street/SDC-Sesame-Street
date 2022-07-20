import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import Ratings from './Ratings.jsx'
import styled from 'styled-components';

const Card = styled.div`
  min-width: 310px;
  min-height: min-content;
  background: white;
  border-radius: 10px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  position: relative;
`

const Image = styled.div`
  width: 100%;
  height: 280px;
  background-color: rgb(240 240 240 / 80%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: cover;
  font-size: 30px;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: URL(${({url}) => url});
  background-size: cover;
`

const Title = styled.p`
  margin: 0px 0px 3px 10px;
  font-weight: 900;
`

const Price = styled.p`
  margin: 1px 0px 0px 10px;
  font-size: 12px;
`

const Category = styled.p`
  margin-left: 10px;
  font-size: 13px;
`

const Button = styled.div`
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 10px;
  color: white;
`

function OutfitList({ slide, deleteOutfit }) {
  const deleteHandler = () => {
    deleteOutfit(slide.id);
  };

  return (
    <Card>
      <Button>
      <TiDeleteOutline size={25} onClick={deleteHandler} />
      </Button>
      <Image url={slide.url} />
      <Category>{slide.category}</Category>
      <Title>{slide.name}</Title>
      <Price>
        $
        {slide.price}
      </Price>
      <Ratings rating={slide?.avg}/>
    </Card>
  );
}

export default OutfitList;
