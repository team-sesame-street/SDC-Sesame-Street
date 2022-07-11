import React from 'react';

function ReviewsResponse({ responseBody }) {
  return (
    <div>
      {responseBody ? (
        <span>
          Response:
          <br />
          {responseBody}
        </span>
      ) : (
        <span />
      )}
    </div>
  );
}

export default ReviewsResponse;
