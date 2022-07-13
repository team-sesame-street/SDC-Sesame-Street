import React from 'react';

function PageSwitcher({ setProductId }) {
  function handleClicker(e) {
    const val = e.target.value;
    setProductId(val);
  }
  return (
    <form onClick={handleClicker}>
      <button value='40346'>SHAMWOW</button>
      <button value='40347'>SPONGEBOB</button>
      <button value='40348'>MEDICAL LINE</button>
      <button value='40349'>QUESTION 3</button>
      <button value='40350'>HULK</button>
      <button value='40351'>FIRSTPAGE EMPTY - RFP2205</button>
      <button value='40352'>TALLYHOE</button>
  </form>
  );
}

export default PageSwitcher;