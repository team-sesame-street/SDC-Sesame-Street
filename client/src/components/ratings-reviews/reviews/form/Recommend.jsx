/* eslint-disable react/prop-types */
import React from 'react';

export default function Recommend({ recommendProduct, setRecommendProduct }) {
  return (
    <div>
      <input
        type="radio"
        name="recommend"
        value="yes"
        checked={recommendProduct === true}
        onChange={() => { setRecommendProduct(true); }}
        required
      />
      {' '}
      Yes
      {' '}
      <input
        type="radio"
        name="recommend"
        value="no"
        checked={recommendProduct === false}
        onChange={() => { setRecommendProduct(false); }}
      />
      {' '}
      No
    </div>
  );
}
