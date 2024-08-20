import React, { useState } from 'react';

const Switch = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div className="form-check form-switch d-flex justify-content-center">
        <input 
          type="checkbox" 
          className="form-check-input" 
          checked={toggle} 
          onChange={e => setToggle(e.target.checked)} 
        />
      </div>
    </>
  );
}

export default Switch;
