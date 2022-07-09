import { Fragment, useState } from 'react';
import InputSlider from './InputSlider';
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

const ToolBar = ({
  playing,
  setPlaying,
  numSteps,
  setNumSteps,
  tempo,
  setTempo,
  distortionValue,
  setDistortionValue,
  bitCrusherValue,
  setBitCrusherValue,
  chebyValue,
  setChebyValue,
  reverbValue,
  setReverbValue,
}) => {
  const onInputChange =
    (setState, isInt = true) =>
    (e) => {
      const value = isInt
        ? parseInt(e.target.value)
        : parseFloat(e.target.value);
      setState(value);
    };

  return (
    <div className="tool-container">
      <InputSlider
        title="TEMPO"
        defaultValue={tempo}
        secondaryValue="BPM"
        range={[60, 200]}
        onInputChange={onInputChange(setTempo)}
      />
      <InputSlider
        title="STEPS"
        defaultValue={numSteps}
        range={[1, 16]}
        onInputChange={onInputChange(setNumSteps)}
      />
      <InputSlider
        title="DISTORTION"
        defaultValue={distortionValue}
        range={[0, 1]}
        onInputChange={onInputChange(setDistortionValue, false)}
        step={0.1}
      />
      <InputSlider
        title="BITCRUSHER"
        defaultValue={bitCrusherValue}
        range={[1, 16]}
        onInputChange={onInputChange(setBitCrusherValue)}
      />
      <InputSlider
        title="ELECTRO"
        defaultValue={chebyValue}
        range={[1, 100]}
        onInputChange={onInputChange(setChebyValue)}
      />
      <InputSlider
        title="REVERB"
        defaultValue={reverbValue}
        range={[1, 10]}
        onInputChange={onInputChange(setReverbValue)}
      />
      <Play playing={playing} setPlaying={setPlaying} />
      {/*<Tempo tempo={tempo} setTempo={setTempo} />
      <StepSize
        numSteps={numSteps}
        setNumSteps={setNumSteps}
        setPlaying={setPlaying}
      /> */}
    </div>
  );
};

export default ToolBar;
