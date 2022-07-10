import { useState } from 'react';

import "./ToolBar.css"

const InputSlider = ({
  title,
  defaultValue,
  secondaryValue,
  range,
  onInputChange,
  step=1
}) => {
  const [tempValue, setTempValue] = useState(defaultValue)
  const updateValue=(e)=>{
    setTempValue(e.target.value)
  }
  return (
    <div className='input-slide-container'>
      <div className='input-title'>{title}</div>
      <div className='input-value'>{tempValue}
      {secondaryValue && <span className='input-value-secondary'>{secondaryValue}</span>}
      </div>
      <input
        type="range"
        min={range[0]}
        max={range[1]}
        defaultValue={defaultValue}
        onClick={onInputChange}
        onChange={updateValue}
        step={step}
      />
    </div>
  );
};

export default InputSlider;
