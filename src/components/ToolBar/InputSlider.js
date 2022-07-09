import { useState } from 'react';

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
    <div>
      <div>{title}</div>
      <div>{tempValue}
      {secondaryValue && <span>{secondaryValue}</span>}
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
