/* eslint-disable react/prop-types */
import React from 'react';

export default function ReviewsUser({ user }) {
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
