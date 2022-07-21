/* eslint-disable react/prop-types */
import React from 'react';
import { GrCheckmark } from 'react-icons/gr';

const styles = {
  recommendContainer: {
    display: 'flex',
  },
};

export default function ReviewsRecommend({ recommend }) {
  return (
    <div>
      {recommend && (
        <div style={styles.recommendContainer}>
          <GrCheckmark />
          I recommend this product
        </div>
      )}
    </div>
  );
}
