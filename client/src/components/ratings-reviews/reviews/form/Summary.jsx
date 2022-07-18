/* eslint-disable react/prop-types */
import React from 'react';

const styles = {
  warning: {
    fontStyle: 'italic',
    fontSize: '12px',
  },
};

export default function Summary({ summaryText, setSummaryText }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Example: Best purchase ever!"
        size="58"
        maxLength="60"
        onChange={(event) => setSummaryText(event.target.value)}
        value={summaryText}
      />
      <br />
      <div style={styles.warning}>
        {`${60 - summaryText.length} characters remaining`}
      </div>
    </div>
  );
}
