import { Fragment } from 'react';
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

const Tempo = () => {
  return (
    <Fragment>
      {/* <span>Tempo</span> */}
      <label>
        Tempo
        <input type="number" defaultValue={120} />
      </label>
    </Fragment>
  );
};

const StepSize = () => {
  return (
    <Fragment>
      {/* <strong>Steps</strong> */}
      {/* <span>Steps</span> */}
      <label>
        Steps
        <input type="number" defaultValue={8} />
      </label>
    </Fragment>
  );
};

const ToolBar = ({ playing, setPlaying }) => {
  return (
    <div className="tool-container">
      <Play playing={playing} setPlaying={setPlaying} />
      <Tempo />
      <StepSize />
    </div>
  );
};

export default ToolBar;
