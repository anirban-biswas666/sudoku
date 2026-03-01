const SUDOKU_API= 
'https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{solution}}}';


export const fetchPuzzle= async ({
              setError,
              setStatus,
              setPuzzle,
              setSolution,
              setBoard,
              setSelected,

}) => {
        setError('');
        setStatus('');


        try{
              const res = await fetch(SUDOKU_API);
              const data = await res.json();
              const grid = data.newboard.grids[0];
              const puzzle = grid.value;
              const solution = grid.solution;
        } catch (e){
            setError('Failed to fetch puzzle.',e);
        }

};