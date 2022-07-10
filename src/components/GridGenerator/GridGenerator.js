import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { kit } from './LoadSound';
import './GridGenerator.css';
import Row from './Row';

const LED = ({ cell }) => {
  const on = cell ? 'led led-on' : 'led';
  return (
    <div className="led-container">
      <div className={on}></div>
    </div>
  );
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

const GridGenerator = ({ playing, setPlaying, numSteps, tempo }) => {
  const initCellActive = useCallback(
    () => Array.from({ length: numSteps }, () => false),
    [numSteps]
  );
  const [cellActive, setCellActive] = useState(initCellActive);

  // Counter index variable
  const activeCellIndex = useRef(0);

  const drumkit = useRef(Array.from({ length: 9 }, () => false));

  // Reinitialize cellActive state when number of steps changes
  useEffect(() => {
    activeCellIndex.current = 0;
    setCellActive(initCellActive);
  }, [numSteps, initCellActive]);

  // Counter tick
  // beat duration = (60 seconds / BPM * 4) * 1000 ms
  const interval = useRef(null);
  const isPlaying = playing === true;
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
      }, parseInt(60000 / (tempo * 4)));
    else clearInterval(interval.current);
    return () => clearInterval(interval.current);
  }, [isPlaying, tempo, playing, cellActive, numSteps]);

  return (
    <Fragment>
      <LEDstrip cellActive={cellActive} />
      {drumkit.current.map((_, drumIndex) => {
        return (
          <Row
            key={drumIndex}
            cellActive={cellActive}
            numSteps={numSteps}
            instrument={kit[drumIndex]}
          />
        );
      })}
    </Fragment>
  );
};

export default GridGenerator;
