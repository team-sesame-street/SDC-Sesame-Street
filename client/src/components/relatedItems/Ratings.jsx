/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';

const Container = styled.div`
  padding-left: 5px;
  padding-bottom: 5px;
`;

function Ratings({ rating }) {
  const starRating = Math.round(rating * 4) / 4;
  return (
    <Container data-testid="ratings">
      <StarRatings rating={starRating} starDimension="18px" starSpacing="2px" starRatedColor="goldenrod" />
    </Container>
  );
}

export default Ratings;
