import { Fragment, useEffect, useState } from 'react';
import GridGenerator from '../GridGenerator/GridGenerator';
import ToolBar from '../ToolBar/ToolBar';

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [beatDuration, setBeatDuration] = useState(125);
  const [numSteps, setNumSteps] = useState(8);

  useEffect(() => console.log(numSteps), [numSteps]);

  return (
    <Fragment>
      <ToolBar
        playing={playing}
        setPlaying={setPlaying}
        beatDuration={beatDuration}
        setBeatDuration={setBeatDuration}
        numSteps={numSteps}
        setNumSteps={setNumSteps}
      />
      <GridGenerator
        playing={playing}
        beatDuration={beatDuration}
        numSteps={numSteps}
      />
    </Fragment>
  );
};

export default App;
