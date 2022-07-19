/* eslint-disable react/prop-types */
import React from 'react';
import { GoTriangleDown } from 'react-icons/go';
import RatingsBar from '../../../../utils/RatingsBar.jsx';

const styles = {
  sizeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  sizeItems: {
    display: 'flex',
    flexDirection: 'space-between',
  },
};

export default function ProductBreakdown({ meta }) {
  const barArr = [];
  const nameArr = [];
  const nameVal = [];
  const sizeObj = {
    Comfort: ['Uncomfortable', 'Perfect'],
    Fit: ['Runs tight', 'Perfect', 'Runs loose'],
    Length: ['Runs short', 'Perfect', 'Runs long'],
    Size: ['A size small', 'Perfect', 'A size big'],
    Quality: ['Poor', 'Perfect'],
    Width: ['Runs narrow', 'Perfect', 'Runs Wide'],
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
    localStorage.setItem('characteristicsArray', nameArr);
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
            <div style={styles.sizeContainer}>
              {sizeObj[name].map((size) => (
                <div style={styles.sizeItems} key={size[size.length - 2]}>
                  { size }
                </div>
              ))}
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
}
