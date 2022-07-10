import { useState } from 'react';
import GridGenerator from '../GridGenerator/GridGenerator';
import ToolBar from '../ToolBar/ToolBar';
import "./App.css"

const App = () => {
  const [playing, setPlaying] = useState(false);

  // States for sliders
  const [tempo, setTempo] = useState(120);
  const [numSteps, setNumSteps] = useState(8);

  // MAKE FUCKING CONTEXT PROVIDER
  return (
    <div className='App'>
      <div className='title'>STEP SEQUENCER
      <div className='sub-title'>Drum machine</div>
      </div>
      <ToolBar
        playing={playing}
        setPlaying={setPlaying}
        tempo={tempo}
        setTempo={setTempo}
        numSteps={numSteps}
        setNumSteps={setNumSteps}
      />
      <GridGenerator
        playing={playing}
        setPlaying={setPlaying}
        tempo={tempo}
        numSteps={numSteps}
      />
    </div>
  );
};

export default App;
