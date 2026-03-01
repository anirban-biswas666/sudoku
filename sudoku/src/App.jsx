import './App.css'
import Controls from './components/Controls';
import Grid from './components/Grid';
import { useState } from "react";

function App() {
   const [board,setBoard] = useState( Array(9)
  .fill(null)
  .map(() => Array(9).fill(null)));
   
  
  const [puzzle,setPuzzle] = useState(Array(9)
  .fill(null)
  .map(()=> Array(9).fill(null)));
  
  const [solution,setSolution] = useState(
    Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))

  );

  
  const [status,setStatus] = useState('');
  
  const[error,setError] = useState('');
  
  
  const [selected,setSelected] = useState(null);

    const[greenCount, setGreenCount]=useState(null);


  const handleCheck = () => {
     const flatboard = board.flat();
     const flatSolution = solution.flat();
     if (flatboard.every((cell,i) => cell === flatSolution[i])){
       setStatus('Correct!');
        
       let count =0;
       const totalCells = 81;
       const intervals = setInterval(()=> {
        count++;
        setGreenCount(count);
        if(count === totalCells) clearInterval(intervals);
         },30);
       }else{
      setStatus('Incorrect,try again.');
       setGreenCount(0);
        }
      };
  const handleReset = () => {
      setBoard(puzzle.map((row)=>[...row]));
      setStatus('');
      setSelected(null);
      setGreenCount(0)
  };
  const handleNewPuzzle = () => {
    setGreenCount(0)
  };

 const handleInput = (rIdx, cIdx, value) => {
  if (value === "" || (value >= 1 && value <= 9)) {
    setBoard((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) => {
          if (r === rIdx && c === cIdx) {
            return value ? parseInt(value) : null;
          }
          return cell;
        })
      )
    );
  }
};

    

    return(
        <div style= {{textAlign: 'center'}}>
            <h1>Sudoku</h1>
             <Grid 
             board={board} 
             handleInput={handleInput}
             puzzle={puzzle}
             selected={selected} 
             setSelected={setSelected}
             greenCount={greenCount}/>

             <Controls 
                  
                  handleCheck ={handleCheck}
                  handleReset = {handleReset}
                  handleNewPuzzle = {handleNewPuzzle}
             
             />
             {setStatus && <div className="status">{status}</div>}
             
        </div>
     );

}

export default App
