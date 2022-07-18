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
        required
      />
      <br />
      <div style={styles.warning}>
        {summaryText.length === 60 ? (
          <div style={{ color: 'red' }}>
            0 characters remaining
          </div>
        ) : (
          <div>
            {`${60 - summaryText.length} characters remaining`}
          </div>
        )}
      </div>
    </div>
  );
}
