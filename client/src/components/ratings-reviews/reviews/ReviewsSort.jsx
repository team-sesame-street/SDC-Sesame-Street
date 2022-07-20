/* eslint-disable react/prop-types */
import React from 'react';

const styles = {
  sortBtnStyle: {
    marginLeft: '6px',
  },
};

export default function ReviewsSort({ setSort }) {
  return (
    <div className="sort" style={styles.sortBtnStyle}>
      <select onChange={(event) => { setSort(event.target.value); }}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpfulness</option>
      </select>
    </div>
  );
}
