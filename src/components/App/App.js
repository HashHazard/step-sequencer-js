import { Fragment, useEffect, useState } from 'react';
import GridGenerator from '../GridGenerator/GridGenerator';
import ToolBar from '../ToolBar/ToolBar';

const App = () => {
  const [playing, setPlaying] = useState(false);

  // States for sliders
  const [tempo, setTempo] = useState(120);
  const [numSteps, setNumSteps] = useState(8);
  const [bitCrusherValue, setBitCrusherValue] = useState(16);
  const [distortionValue, setDistortionValue] = useState(parseFloat('0'));
  const [chebyValue, setChebyValue] = useState(1)
  const [reverbValue, setReverbValue] = useState(1)

  // MAKE FUCKING CONTEXT PROVIDER
  return (
    <Fragment>
      <ToolBar
        playing={playing}
        setPlaying={setPlaying}
        tempo={tempo}
        setTempo={setTempo}
        numSteps={numSteps}
        setNumSteps={setNumSteps}
        distortionValue={distortionValue}
        setDistortionValue={setDistortionValue}
        bitCrusherValue={bitCrusherValue}
        setBitCrusherValue={setBitCrusherValue}
        chebyValue={chebyValue}
        setChebyValue={setChebyValue}
        reverbValue={reverbValue}
        setReverbValue={setReverbValue}
      />
      <GridGenerator
        playing={playing}
        setPlaying={setPlaying}
        tempo={tempo}
        numSteps={numSteps}
        distortionValue={distortionValue}
        bitCrusherValue={bitCrusherValue}
        chebyValue={chebyValue}
        reverbValue={reverbValue}
      />
    </Fragment>
  );
};

export default App;
