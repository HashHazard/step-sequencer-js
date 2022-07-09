import {
  Player,
  loaded,
  BitCrusher,
  Distortion,
  Destination,
  Chebyshev,
  Reverb,
} from 'tone';
import { useEffect, useRef, useState } from 'react';

import './GridGenerator.css';

const Cell = ({ on, cellHighlight, onClick, onContextMenu }) => {
  const active = cellHighlight ? 'button-highlight' : '';
  const scaleButton = on && active ? 'button-scale' : '';
  const buttonOn = on ? `button button-on ${scaleButton}` : `button ${active}`;
  return (
    <div
      className={buttonOn}
      onClick={onClick}
      onContextMenu={onContextMenu}
    ></div>
  );
};

////// PARENT COMPONENT //////
const Row = ({
  cellActive,
  numSteps,
  instrument,
  distortionValue,
  bitCrusherValue,
  chebyValue,
  reverbValue
}) => {
  const initialCellsState = Array.from({ length: numSteps }, () => false);
  const [cells, setCells] = useState(initialCellsState);

  // Reinitialize cells state when number of steps changes
  useEffect(() => setCells(initialCellsState), [numSteps]);

  const synth = useRef(null);
  const crusher = useRef(null);
  const distortion = useRef(null);
  const cheby = useRef(null);
  const reverb = useRef(null)
  useEffect(() => {
    // synth.current = new Synth().toDestination();
    // synth.current = new PolySynth(MembraneSynth).toDestination()

    synth.current = new Player(instrument).toDestination();

    // synth.current = new Player(instrument);

    distortion.current = new Distortion().toDestination()

    crusher.current = new BitCrusher(16).toDestination()
    cheby.current = new Chebyshev(1).toDestination()

    reverb.current = new Reverb(undefined).toDestination()

    // synth.current.fan(
    //   cheby.current,
    //   crusher.current,
    //   distortion.current,
    //   reverb.current,
    //   // Destination
    // );

    // synth.current = new MembraneSynth().toDestination()
  }, []);

  useEffect(() => {
    distortion.current.distortion = distortionValue;
    crusher.current.bits = bitCrusherValue;
    cheby.current.order = chebyValue;
    // reverb.current.decay = reverbValue;
  }, [distortionValue, chebyValue]);

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
          cellHighlight={cellActive[cellIndex]}
          onClick={cellOnClick(cellIndex)}
          onContextMenu={onRightClick}
        />
      ))}
    </div>
  );
};

export default Row;
