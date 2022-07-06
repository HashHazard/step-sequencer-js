import { useState } from 'react';

const UpdateStateVar = () => {
  const [age, setAge] = useState(21);
  const [siblingNum, setSiblingNum] = useState(2);
  const handleClick = () => setAge(age + 1);
  const handleSiblingNum = () => setSiblingNum(siblingNum + 1);

  return (
    <div>
      <p>I'am {age} years of age</p>
      <p>I have {siblingNum} siblings</p>
      <div>
        <button onClick={handleClick}>Get older!</button>
        <button onClick={handleSiblingNum}>More siblings!</button>
      </div>
    </div>
  );
};

const Hooks = () => {
  return (
    <div>
      <UpdateStateVar />
    </div>
  );
};

export default Hooks;
