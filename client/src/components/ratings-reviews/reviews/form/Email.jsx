/* eslint-disable react/prop-types */
import React from 'react';

const styles = {
  warning: {
    fontStyle: 'italic',
    fontSize: '12px',
  },
};

export default function Email({ email, setEmail }) {
  return (
    <div>
      <input
        type="email"
        placeholder="Example: jackson11@email.com"
        size="58"
        maxLength="60"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <br />
      <div style={styles.warning}>
        For authentication reasons, you will not be emailed
      </div>
    </div>
  );
}
