import { Fragment, useEffect, useRef, useState } from 'react';
import { Synth } from 'tone';

import './GridGenerator.css';
import Row from './Row';

const LED = ({cell}) => {
  const on = cell ? "led led-on" : "led"
  return <div className='led-container'>
    <div className={on}></div>
  </div>;
};

const LEDstrip = ({ cellActive }) => {
  return (
    <div className="row-container">
      {cellActive.map((cell, cellIndex) => {
        return <LED key={cellIndex} cell={cell} />;
      })}
    </div>
  );
};

const GridGenerator = ({ playing, numSteps}) => {
  const [cellActive, setCellActive] = useState(
    Array.from({ length: numSteps }, () => false)
  );

  // Tone js synth initialization
  const synth = useRef(null);
  useEffect(() => {
    synth.current = new Synth().toDestination();
  }, []);

  // Tick
  const interval = useRef(null);
  const activeCellIndex = useRef(0);
  useEffect(() => {
    if (playing)
      interval.current = setInterval(() => {
        setCellActive(
          cellActive.map((cell, cellIndex) => {
            if (cellIndex === activeCellIndex.current) return true;
            else return false;
          })
        );
        if (activeCellIndex.current >= numSteps - 1)
          activeCellIndex.current = 0;
        else activeCellIndex.current = activeCellIndex.current + 1;
      }, 120);
    else clearInterval(interval.current);
    return () => clearInterval(interval.current);
  }, [playing === true]);

  return (
    <Fragment>
      <LEDstrip cellActive={cellActive} />
      <Row cellActive={cellActive} synth={synth.current} numSteps={numSteps}/>
      <Row cellActive={cellActive} synth={synth.current} numSteps={numSteps}/>
    </Fragment>
  );
};

export default GridGenerator;
