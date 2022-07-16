/* eslint-disable react/prop-types */
import React from 'react';
import { GoTriangleDown } from 'react-icons/go';
import RatingsBar from '../../../../utils/RatingsBar.jsx';

function ProductBreakdown({ meta }) {
  const barArr = [];
  const nameArr = [];
  const nameVal = [];
  const sizeObj = {
    Fit: 'Poor',
    Length: 'Too small',
    Size: 'Too small',
    Comfort: 'Poor',
    Quality: 'Poor',
  }
  if (meta) {
    const char = meta.characteristics;
    const keysArr = Object.keys(char);
    for (let i = 0; i < keysArr.length; i += 1) {
      barArr.push(
        <RatingsBar
          fillWidth={0}
          className={keysArr[i]}
          width={300}
        />,
      );
      const currVal = keysArr[i];
      nameArr.push(currVal);
      nameVal.push(char[currVal]);
    }
  }
  return (
    <div>
      {barArr.map((bar, i) => {
        const percent = (nameVal[i].value / 5) * 910;
        return (
          <div key={nameArr[i]} style={{ position: 'relative' }}>
            {nameArr[i]}
            {nameVal[i].value}
            {bar}
            <GoTriangleDown size={30} style={{position: 'absolute', transform: `translate(${percent}%, -70%)` }}/>
            {sizeObj[nameArr[i]]}
          </div>
        )})}
    </div>
  );
}

const triangleStyles = {
  position: 'absolute',
  // -10% min and 910% max for first argument in translate
  transform: 'translate(450%, -70%)',
};

export default ProductBreakdown;
