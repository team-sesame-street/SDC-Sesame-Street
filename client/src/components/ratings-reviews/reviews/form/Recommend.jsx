import React from 'react';

export default function Recommend( {recommendProduct, setRecommendProduct }) {
  return (
    <div>
      <input
        type="radio"
        value="yes"
        checked={recommendProduct === 'yes'}
        onChange={() => { setRecommendProduct('yes'); }}
      />
      {' '}
      Yes
      {' '}
      <input
        type="radio"
        value="no"
        checked={recommendProduct === 'no'}
        onChange={() => { setRecommendProduct('no'); }}
      />
      {' '}
      No
    </div>
  );
}
