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
  };
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
        const name = nameArr[i];
        const nameValue = nameVal[i].value;
        const percent = (nameValue / 5) * 910;
        return (
          <div key={name} style={{ position: 'relative', fontSize: '16px' }}>
            {name}
            {bar}
            <GoTriangleDown size={30} style={{ position: 'absolute', transform: `translate(${percent}%, -70%)` }} />

            {sizeObj[name] === 'Poor' ? (
              <div style={poorStyle}>
                Poor
                <div>
                  Great
                </div>
              </div>
            ) : (
              <div style={poorStyle}>
                Too small
                <div style={poorSubStyle}>
                  Perfect
                </div>
                <div style={poorSubStyle}>
                  Too large
                </div>
              </div>
            )}
            <br/>
          </div>
        );
      })}
    </div>
  );
}

const poorStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
};

const poorSubStyle = {
  display: 'flex',
  flexDirection: 'space-between',
};

export default ProductBreakdown;
