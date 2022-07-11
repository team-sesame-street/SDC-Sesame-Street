/* eslint-disable react/prop-types */
import React from 'react';

function ReviewsResponse({ responseBody }) {
  return (
    <div>
      {responseBody && (
        <span>
          Response:
          <br />
          {responseBody}
        </span>
      )}
    </div>
  );
}

export default ReviewsResponse;
