/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import { GrCheckmark } from 'react-icons/gr';

function ReviewsRecommend({ recommend }) {
  return (
    <div>
      {recommend ? (
        <span style={recommendContainer}>
          <GrCheckmark />
          I recommend this product
        </span>
      ) : (
        <span />
      )}
    </div>
  );
}

const recommendContainer = {
  display: 'flex',
};

export default ReviewsRecommend;
