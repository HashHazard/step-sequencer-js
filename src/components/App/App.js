import { Fragment, useState } from 'react';
import GridGenerator from '../GridGenerator/GridGenerator';
import ToolBar from '../ToolBar/ToolBar';

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(120)
  const [numSteps, setNumSteps] = useState(8)

  return (
    <Fragment>
      <ToolBar playing={playing} setPlaying={setPlaying} setTempo={setTempo} setNumSteps={setNumSteps}/>
      <GridGenerator playing={playing} tempo={tempo} numSteps={numSteps}/>
    </Fragment>
  );
};

export default App;
