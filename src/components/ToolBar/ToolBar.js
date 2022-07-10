import { IconContext } from 'react-icons';
import { FaPlay, FaPause } from 'react-icons/fa';

import InputSlider from './InputSlider';
import './ToolBar.css';

const Play = ({ playing, setPlaying }) => {
  const onPlayClick = (e) => {
    setPlaying(!playing);
  };
  return (
    <div className="a">
      <div
        className={`play-button ${playing ? 'play-button-select' : ''}`}
        onClick={onPlayClick}
      >
        <IconContext.Provider
          value={{
            color: 'white',
            className: 'play',
            size: 30,
          }}
        >
          {!playing ? <FaPlay /> : <FaPause />}
        </IconContext.Provider>
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
        title="Tempo"
        defaultValue={tempo}
        secondaryValue="BPM"
        range={[60, 200]}
        onInputChange={onInputChange(setTempo)}
      />
      <Play playing={playing} setPlaying={setPlaying} />
      <InputSlider
        title="Steps"
        defaultValue={numSteps}
        secondaryValue="1-16"
        range={[1, 16]}
        onInputChange={onInputChange(setNumSteps)}
      />
    </div>
  );
};

export default ToolBar;
