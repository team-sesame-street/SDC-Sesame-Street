/* eslint-disable react/prop-types */
import React from 'react';

function ReviewsUser({ user }) {
  let username = user;
  if (user.indexOf('@') > -1) {
    username = user.slice(0, user.indexOf('@'));
  }

  return (
    <div>
      {username}
    </div>
  );
}

export default ReviewsUser;
