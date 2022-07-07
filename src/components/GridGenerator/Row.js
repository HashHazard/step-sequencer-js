import { Fragment, useEffect, useRef, useState } from 'react';

import './GridGenerator.css';

const Cell = ({ on, onClick, onContextMenu }) => {
  const buttonStyle = on ? 'button button-on' : 'button';
  return (
    <div
      className={buttonStyle}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {/* {on ? 'A' : ''} */}
    </div>
  );
};

////// PARENT COMPONENT //////
const Row = ({ cellActive, synth, numSteps }) => {
  const initialCellsState = Array.from({ length: numSteps }, () => false);
  const [cells, setCells] = useState(initialCellsState);

  // const [isLoaded, setLoaded] = useState(false);

  //   sampler.current = new Sampler(
  //     { hihat },
  //     {
  //       onload: () => {
  //         setLoaded(true);
  //       },
  //     }
  //   ).toDestination();
  // }, []);

  const playSound = () => {
    synth.triggerAttackRelease('C4', '8n');
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
          onClick={cellOnClick(cellIndex)}
          onContextMenu={onRightClick}
        />
      ))}
    </div>
  );
};

export default Row;
