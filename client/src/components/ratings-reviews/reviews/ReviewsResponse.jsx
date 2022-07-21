/* eslint-disable react/prop-types */
import React from 'react';

export default function ReviewsResponse({ responseBody }) {
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
