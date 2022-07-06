import { useEffect, useRef, useState } from 'react';
// import Cell from './Cell';
import './Grid.css';

const Grid = ({ stepNumber, isPlaying }) => {
  const initialCells = Array.from({ length: stepNumber }, () => ({
    active: false,
  }));

  ////////////
  // STATES //
  ////////////
  const [steps, setSteps] = useState(initialCells);
  const [cellHighlight, setCellHighlight] = useState(
    Array.from({ length: stepNumber }, () => false)
  );

  const onRightClick = (e) => e.preventDefault();

  const audioElement = document.getElementById('audio-element');
  const playAudio = () => {
    if (!audioElement) return;
    // console.log('audio played');
    audioElement.currentTime = 0;
    audioElement.play();
  };
  const updateCell = (i) => (event) => {
    if (!steps[i].active) playAudio();
    setSteps(
      steps.map((step, stepIndex) => {
        if (stepIndex === i) return { active: !step.active };
        else return step;
      })
    );
  };

  // const index = useRef(0)
  let index = { current: 0 };
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCellHighlight(
          cellHighlight.map((highlight, highlightIndex) => {
            if (index.current === highlightIndex) {
              if (steps[highlightIndex].active) {
                // console.table(steps)
                playAudio();
              }
              return (highlight = true);
            } else return (highlight = false);
          })
        );
        // console.log(index);
        if (index.current >= stepNumber - 1) index.current = 0;
        else index.current = index.current + 1;
      }, 120);
    } else {
      // index = 0;
      clearInterval(interval);
    }
    return () => {
      // index = 0;
      // setCellHighlight(Array.from({ length: stepNumber }, () => false));
      clearInterval(interval);
    };
  }, [isPlaying, steps]);

  return (
    <>
      <audio id="audio-element" className="audio" src="./hihat.wav">
        {/* <source src="./hihat.wav"></source> */}
      </audio>
      <div className="grid">
        {steps.map((step, index) => (
          // <Cell key={index} stepState={[steps, setSteps]} />

          <div
            style={{
              background: step.active ? '#eee' : '#310735',
              // color: step.active ? 'black' : 'white',
              // fontSize: step.active ? '50px' : '30px',
              border: cellHighlight[index]
                ? '5px solid cyan'
                : '5px solid #ffffff00',
              transform: cellHighlight[index] ? 'scale(1.2)' : 'scale(1)',
            }}
            key={index}
            className="cell"
            onClick={updateCell(index)}
            onContextMenu={onRightClick}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Grid;
