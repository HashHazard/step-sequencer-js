import './Grid.css';

const Cell = ({ index, stepState }) => {
  let cellStyle = 'cell';
  const [steps, setSteps] = stepState;
  const updateCell = (i) => (event) => {
    setSteps(
      steps.map((step, stepIndex) => {
        if (stepIndex === i) {
          if (step) cellStyle = 'cell cell-active';
          else cellStyle = 'cell';
          return !step;
        } else {
          return step;
        }
      })
    );
  };
  return (
    <div className={cellStyle} onClick={updateCell(index)}>
      c
    </div>
  );
};

export default Cell;
