// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import Grid from '../Grid/Grid';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  /////////////////////////////////////////////////
  ////////// MOVE THE START ONE LEVEL UP //////////
  /////////////////////////////////////////////////
  // const [cellHighlight, setCellHighlight] = useState(
  //   Array.from({ length: stepNumber }, () => false)
  // );

  // useEffect(() => {
  //   let interval = null;
  //   if (isPlaying){
  //     interval = setInterval(()=>{
  //       setCellHighlight(
  //         cellHighlight.map((highlight, highlightIndex)=>{

  //         })
  //       )
  //     }, 120)
  //   }
  // }, []);

  return (
    <div className="App">
      <button onClick={() => setIsPlaying(!isPlaying)}>Play</button>
      <Grid stepNumber={16} isPlaying={isPlaying} />
      <Grid stepNumber={16} isPlaying={isPlaying} />
      <Grid stepNumber={16} isPlaying={isPlaying} />
      <Grid stepNumber={16} isPlaying={isPlaying} />
      {/* <Grid stepNumber={16} isPlaying={isPlaying} /> */}
    </div>
  );
}

export default App;
