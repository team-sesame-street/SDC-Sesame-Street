/* eslint-disable react/prop-types */
import React from 'react';

export default function Recommend({ recommendProduct, setRecommendProduct }) {
  return (
    <div>
      <input
        type="radio"
        name="recommend"
        value="yes"
        checked={recommendProduct === 'yes'}
        onChange={() => { setRecommendProduct('yes'); }}
        required
      />
      {' '}
      Yes
      {' '}
      <input
        type="radio"
        name="recommend"
        value="no"
        checked={recommendProduct === 'no'}
        onChange={() => { setRecommendProduct('no'); }}
      />
      {' '}
      No
    </div>
  );
}
