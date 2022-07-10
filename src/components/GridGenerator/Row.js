import { Player, loaded } from 'tone';
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
const Row = ({ cellActive, numSteps, instrument }) => {
  const initialCellsState = Array.from({ length: numSteps }, () => false);
  const [cells, setCells] = useState(initialCellsState);

  // Reinitialize cells state when number of steps changes
  useEffect(() => setCells(initialCellsState), [numSteps]);

  const synth = useRef(null);
  useEffect(() => {
    synth.current = new Player(instrument).toDestination();
  }, []);

  const playSound = () => {
    loaded().then(() => {
      synth.current.start();
    });
  };

  useEffect(() => {
    cellActive.map((aCell, aCellIndex) => {
      if (aCell && cells[aCellIndex]) return playSound();
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
