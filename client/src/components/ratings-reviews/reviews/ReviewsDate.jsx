/* eslint-disable react/prop-types */
import React from 'react';
import formatDate from '../../../../utils/formatDate';

export default function ReviewsDate({ date }) {
  return (
    <div>
      {formatDate(date)}
    </div>
  );
}
