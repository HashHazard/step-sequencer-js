import { Fragment, useState } from 'react';
import './ToolBar.css';

const Play = ({ playing, setPlaying }) => {
  const onPlayClick = (e) => {
    setPlaying(!playing);
  };
  return (
    <div className="card">
      <div className="gradient-border">
        <div className="content-wrapper" onClick={onPlayClick}>
          {playing ? 'Pause' : 'Play'}
        </div>
      </div>
    </div>
  );
};

const Tempo = ({ beatDuration, setBeatDuration }) => {
  const [invalid, setInvalid] = useState(false);
  const handleSetTempo = (e) => {
    const tempo = parseInt(e.target.value);
    // beat duration = (60 seconds / BPM) * 1000 ms
    const beatInMS = (60 / tempo) * 1000;
    const subBeat = beatInMS / 4;
    if (tempo > 0 && tempo <= 200 && typeof tempo === 'number') {
      setInvalid(false);
      if (beatDuration !== subBeat) setBeatDuration(parseInt(subBeat));
    } else setInvalid(true);
  };
  return (
    <Fragment>
      <label>
        Tempo
        <input
          style={{ background: `${invalid ? '#f2dede' : 'white'}` }}
          type="number"
          defaultValue={120}
          onChange={handleSetTempo}
        />
      </label>
    </Fragment>
  );
};

const StepSize = ({ numSteps, setNumSteps, setPlaying }) => {
  const [invalid, setInvalid] = useState(false);
  const handleSetStep = (e) => {
    const numofsteps = parseInt(e.target.value);
    if (numofsteps > 0 && numofsteps <= 16 && typeof numofsteps === 'number') {
      setInvalid(false);

      if (numSteps !== numofsteps) {
        setPlaying(false);
        setNumSteps(numofsteps);
      }
    } else setInvalid(true);
  };
  return (
    <Fragment>
      <label>
        Steps
        <input
          style={{ background: `${invalid ? '#F04E5B' : 'white'}` }}
          type="number"
          defaultValue={8}
          onChange={handleSetStep}
        />
      </label>
    </Fragment>
  );
};

const ToolBar = ({
  playing,
  setPlaying,
  numSteps,
  setNumSteps,
  beatDuration,
  setBeatDuration,
}) => {
  return (
    <div className="tool-container">
      {/* <div className='element'></div> */}
      <Play playing={playing} setPlaying={setPlaying} />
      <Tempo beatDuration={beatDuration} setBeatDuration={setBeatDuration} />
      <StepSize
        numSteps={numSteps}
        setNumSteps={setNumSteps}
        setPlaying={setPlaying}
      />
    </div>
  );
};

export default ToolBar;
