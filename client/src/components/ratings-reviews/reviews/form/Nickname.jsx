/* eslint-disable react/prop-types */
import React from 'react';

const styles = {
  warning: {
    fontStyle: 'italic',
    fontSize: '12px',
  },
};

export default function Nickname({ nickname, setNickName }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Example: jackson11!"
        size="58"
        maxLength="60"
        onChange={(event) => setNickName(event.target.value)}
        value={nickname}
        required
      />
      <br />
      <div style={styles.warning}>
        For privacy reasons, do not use your full name or email address
      </div>
    </div>
  );
}
