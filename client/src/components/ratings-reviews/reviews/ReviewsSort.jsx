/* eslint-disable react/prop-types */
import React from 'react';

function ReviewsSort({ setSort }) {
  return (
    <div className="sort" style={sortBtnStyle}>
      <select onChange={() => { setSort(event.target.value); }}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpfulness</option>
      </select>
    </div>
  );
}

const sortBtnStyle = {
  marginLeft: '6px',
};

export default ReviewsSort;
