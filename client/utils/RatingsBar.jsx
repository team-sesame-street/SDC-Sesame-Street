/* eslint-disable react/prop-types */
import React from 'react';

function RatingsBar({ fillWidth, className }) {
  const width = 200;
  const containerStyles = {
    height: 12,
    width: `${width}px`,
    backgroundColor: 'lightGray',
    borderRadius: 50,
    margin: 10,
  };

  const fillerStyles = {
    height: '100%',
    width: `${(fillWidth / 100) * width || 0}px`,
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
