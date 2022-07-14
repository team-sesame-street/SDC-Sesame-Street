/* eslint-disable react/prop-types */
import React from 'react';

function RatingsBar({ fillWidth, className }) {
  const containerStyles = {
    height: 10,
    width: '100px',
    backgroundColor: 'lightGray',
    borderRadius: 50,
    margin: 10,
  };

  const fillerStyles = {
    height: '100%',
    width: fillWidth || 0,
    backgroundColor: 'limeGreen',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  return (
    <div style={containerStyles} className={className}>
      <div style={fillerStyles} className={className} />
    </div>
  );
}

export default RatingsBar;
