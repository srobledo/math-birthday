import React, { useState, useEffect, useRef } from 'react';

function DropDownSingle() {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('');
  const drop = useRef(null);
  const toggle = () => {
    setOpen(open => !open);
  };
  const onChangeValue = (e) => {
    setOption(e.target.value);
  };
  const handleClick = (e) => {
    if (!e.target.closest(`.${drop.current.className}, .options`) && open) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return (() => {
      document.removeEventListener('click', handleClick);
    });
  });
  return (
    <div className="relative inline-block mr-10" ref={drop}>
      <button className={open ? 'button button-active' : 'button'} onClick={toggle}>{`${option || 'Marketplace'}`}</button>
      {open && (
        <div className="options">
          <label>
            <input 
              type="radio" 
              value="Airbnb" 
              name="filter" 
              checked={option === "Airbnb"}
              onChange={onChangeValue}
              /> Airbnb
          </label>
          <label>
            <input 
              type="radio" 
              value="Vrbo" 
              name="filter" 
              checked={option === "Vrbo"}
              onChange={onChangeValue}
            /> Vrbo
          </label>
        </div>
      )}
    </div>
  );
}

export default DropDownSingle;
