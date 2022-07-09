import { Fragment, useEffect, useRef, useState } from 'react';
import { Synth, MembraneSynth } from 'tone';

import { kit } from './LoadSound';

// import {
//   boom,
//   clap,
//   hihat,
//   kick,
//   openhat,
//   ride,
//   snare,
//   tink,
//   tom,
// } from './LoadSound';

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

const GridGenerator = ({
  playing,
  setPlaying,
  numSteps,
  tempo,
  distortionValue,
  bitCrusherValue,
  chebyValue,
  reverbValue
}) => {
  const initCellActive = () => Array.from({ length: numSteps }, () => false);
  const [cellActive, setCellActive] = useState(initCellActive);

  // Counter index variable
  const activeCellIndex = useRef(0);

  const [drumkit, setDrumkit] = useState(
    Array.from({ length: 9 }, () => false)
  );

  // Reinitialize cellActive state when number of steps changes
  useEffect(() => {
    if (playing) setPlaying(false);
    activeCellIndex.current = 0;
    setCellActive(initCellActive);
  }, [numSteps]);

  // Counter tick
  // beat duration = (60 seconds / BPM * 4) * 1000 ms
  const interval = useRef(null);
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
  }, [playing === true, tempo]);

  // Tone js synth initialization
  const synth = useRef(null);
  useEffect(() => {
    synth.current = new Synth().toDestination();
  }, []);

  return (
    <Fragment>
      <LEDstrip cellActive={cellActive} />
      {drumkit.map((drum, drumIndex) => {
        return (
          <Row
            key={drumIndex}
            cellActive={cellActive}
            synth={synth.current}
            numSteps={numSteps}
            instrument={kit[drumIndex]}
            distortionValue={distortionValue}
            bitCrusherValue={bitCrusherValue}
            chebyValue={chebyValue}
            reverbValue={reverbValue}
          />
        );
      })}
      {/* <Row cellActive={cellActive} synth={synth.current} numSteps={numSteps} />
      <Row cellActive={cellActive} synth={synth.current} numSteps={numSteps} /> */}
    </Fragment>
  );
};

export default GridGenerator;
