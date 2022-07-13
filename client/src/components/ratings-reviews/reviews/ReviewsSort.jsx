import React from 'react';

function ReviewsSort({ setSort }) {
  return (
    <div className="sort">
      <select onChange={() => { setSort(event.target.value)}}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpfulness</option>
      </select>
    </div>
  );
}

export default ReviewsSort;
