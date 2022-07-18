/* eslint-disable react/prop-types */
import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  required: {
    fontStyle: 'italic',
    fontSize: '12px',
  },
};

export default function Body({ bodyText, setBodyText }) {
  return (
    <div style={styles.container}>
      <textarea
        style={{ resize: 'none', marginBottom: '0', padding: '0' }}
        value={bodyText}
        onChange={(event) => setBodyText(event.target.value)}
        type="text"
        minLength="50"
        maxLength="1000"
        placeholder="Why did you like the product or not?"
        cols="58"
        rows="3"
        required
      />
      <div style={styles.required}>
        {bodyText.length > 50 ? (
          <div>
            Minimum reached
          </div>
        ) : (
          <div>
            {`Minimum required characters left: ${51 - bodyText.length}`}
          </div>
        )}
      </div>
    </div>
  );
}
