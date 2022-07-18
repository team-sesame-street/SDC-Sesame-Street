/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const styles = {
  mainContainer: {
    marginLeft: '5%',
  },
  descriptionContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: '15px',
    fontSize: '14px',
    marginLeft: '5%',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default function Characteristics({ descriptionRate, setDescriptionRate }) {
  const characteristicsArr = localStorage.getItem('characteristicsArray').split(',');
  const characteristicsObj = {
    Comfort: [
      'Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect',
    ],
    Fit: [
      'Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose',
    ],
    Length: [
      'Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long',
    ],
    Size: [
      'A size too small', 'Half a size too small', 'Perfect', 'Half a size too big', 'A size too big',
    ],
    Quality: [
      'Poor', 'Below average', 'Good', 'Above average', 'Perfect',
    ],
    Width: [
      'Runs narrow', 'Runs slightly narrow', 'Perfect', 'Runs slightly wide', 'Runs Wide',
    ],
  };

  return (
    <div style={styles.mainContainer}>
      {characteristicsArr.map((characteristic) => (
        <div className={characteristic}>
          <b>{`${characteristic}:*`}</b>
          <br />
          <div style={styles.descriptionContainer}>
            {characteristicsObj[characteristic].map((description, index) => {
              const value = index + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name={characteristic}
                    value={value}
                    checked={descriptionRate[characteristic] === value}
                    onChange={() => setDescriptionRate(
                      { ...descriptionRate, [characteristic]: value },
                    )}
                    required
                  />
                  <br />
                  {description}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
