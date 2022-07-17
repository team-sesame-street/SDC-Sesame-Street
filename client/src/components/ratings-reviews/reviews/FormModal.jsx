/* eslint-disable react/prop-types */
import React from 'react';

function FormModal({ setShowModal }) {
  function handleClick() {
    setShowModal(false);
  }

  function onKeyDown(event) {
    console.log(event.keyCode)
    if (event.keyCode === 27) {
      setShowModal(false);
    }
  }

  return (
    <div className="modalBackground" style={modalBackground}>
      <div className="modalContainer" style={modalContainer}>
        <form>
          <button type="button" onClick={handleClick}>X</button><br />
          Write Your Review<br />
          <label>
            Overall Rating*
            <input type="text" /><br />
            Do You Recommend This Product?*
            <input type="text" /><br />
            Characteristics *
            <input type="text" /><br />
          </label>
          <input type="button" value="Cancel" onClick={handleClick}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

const modalBackground = {
  // width: '100vw',
  // height: '100vh',
  // backgroundColor: 'gray',
  // position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContainer = {
  width: '500px',
  height: '500px',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  display: 'flex',
  flexDirection: 'column',
  padding: '25px',
};

export default FormModal;
