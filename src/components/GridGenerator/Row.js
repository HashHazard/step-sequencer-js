import { Player, loaded, BitCrusher, Distortion, Destination } from 'tone';
import { useEffect, useRef, useState } from 'react';

import './GridGenerator.css';

const Cell = ({
  on,
  mouseClicked,
  setMouseClicked,
  cellHighlight,
  onClick,
  onContextMenu,
}) => {
  const active = cellHighlight ? 'button-highlight' : '';
  const scaleButton = on && active ? 'button-scale' : '';
  const buttonOn = on ? `button button-on ${scaleButton}` : `button ${active}`;
  return (
    <div
      className={buttonOn}
      onClick={onClick}
      onMouseDown={() => console.log('moused pressed')}
      onMouseUp={() => console.log('moused unpressed')}
      onContextMenu={onContextMenu}
    ></div>
  );
};

////// PARENT COMPONENT //////
const Row = ({ cellActive, numSteps, instrument }) => {
  const initialCellsState = Array.from({ length: numSteps }, () => false);
  const [cells, setCells] = useState(initialCellsState);

  const [mouseClicked, setMouseClicked] = useState(false);

  // Reinitialize cells state when number of steps changes
  useEffect(() => setCells(initialCellsState), [numSteps]);

  const synth = useRef(null);
  const crusher = useRef(null);
  const distortion = useRef(null);
  useEffect(() => {
    // synth.current = new Synth().toDestination();
    // synth.current = new PolySynth(MembraneSynth).toDestination()

    synth.current = new Player(instrument).toDestination();

    // synth.current = new Player(instrument);

    // crusher.current = new BitCrusher(16)
    // distortion.current = new Distortion()

    // synth.current.chain(crusher.current, Destination)

    // synth.current = new MembraneSynth().toDestination()
  }, []);

  const playSound = () => {
    // const notes = ['D4', 'F4', 'A4']
    // synth.current.triggerAttackRelease('C2', '8n');
    loaded().then(() => {
      synth.current.start();
    });
  };

  useEffect(() => {
    cellActive.map((aCell, aCellIndex) => {
      if (aCell && cells[aCellIndex]) playSound();
    });
  }, [cellActive]);

  const cellOnClick = (i) => (e) => {
    // if (mouseClicked)
    setCells(
      cells.map((cell, cellIndex) => {
        if (cellIndex === i) {
          // if (!cell) playSound();
          return !cell;
        } else return cell;
      })
    );
  };

  const onRightClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="row-container">
      {cells.map((cell, cellIndex) => (
        <Cell
          key={cellIndex}
          on={cell}
          mouseClicked={mouseClicked}
          setMouseClicked={setMouseClicked}
          cellHighlight={cellActive[cellIndex]}
          onClick={cellOnClick(cellIndex)}
          onContextMenu={onRightClick}
        />
      ))}
    </div>
  );
};

export default Row;
