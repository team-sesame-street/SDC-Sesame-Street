/* eslint-disable react/prop-types */
import React from 'react';

function ReviewsResponse({ responseBody }) {
  return (
    <div>
      {responseBody && (
        <div>
          Response:
          <br />
          {responseBody}
        </div>
      )}
    </div>
  );
}

export default ReviewsResponse;
