/* eslint-disable react/prop-types */
import React from 'react';

function RatingsBar({ fillWidth, className, width, borderRadius, margin }) {
  const containerStyles = {
    height: 12,
    width: `${width}px`,
    backgroundColor: 'lightGray',
    borderRadius: borderRadius || 0,
    margin: margin || 0,
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
