import React, { useState, useEffect, useRef } from 'react';

let selectedFilters = [];

function DropDownMultiple() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([
    {id: 1, value: "All Arrangement Types", isChecked: false, disabled: false},
    {id: 2, value: "Private Room", isChecked: false, disabled: false},
    {id: 3, value: "Shared Room", isChecked: false, disabled: false},
  ]);
  let titleButton = 'Arrangement Types';
  if (selectedFilters.length) {
    titleButton = selectedFilters[0];
    if (selectedFilters.length > 1) {
      titleButton = `+${selectedFilters.length - 1} ${selectedFilters[0]}`;
    }
  }
  const drop = useRef(null);
  const toggle = () => {
    setOpen(open => !open);
  };
  const onChangeValue = (e) => {
    const copyOptions = [...options];
    const option = copyOptions[e.target.id];
    option.isChecked = !option.isChecked;

    // Check if All option is selected
    if (e.target.id === '0' && option.isChecked) {
      copyOptions.forEach((optionCopy) => {
        if (optionCopy.id !== 1) {
          optionCopy.disabled = true;
        }
      });
    } else {
      copyOptions.forEach((optionCopy) => {
        optionCopy.disabled = false;
      });
      copyOptions[0].isChecked = false;
    }
    if (!selectedFilters.includes(option.value)) {
      selectedFilters.push(option.value);
    } else {
      const index = selectedFilters.indexOf(option.value);
      if (index !== -1) {
        selectedFilters.splice(index, 1);
      }
    }
    setOptions(copyOptions);
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
    <div className="relative inline-block" ref={drop}>
      <button className={open ? 'button button-active' : 'button'} onClick={toggle}>{titleButton}</button>
      {open && (
        <div className="options options-multi">
          <div className="p10">
            {options.map((option, index) => {
              return (
                <label key={option.id}>
                  <input
                    name="type"
                    type="checkbox"
                    id={index}
                    value={option.value}
                    checked={option.isChecked}
                    disabled={option.disabled}
                    onChange={onChangeValue} /> 
                    {option.value}
                </label>
              )
            })}
          </div>
          <hr />
          <div className="p5 text-right">
            <button className="button button-secondary" onClick={toggle}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDownMultiple;
