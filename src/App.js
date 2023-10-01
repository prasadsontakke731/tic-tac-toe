
import { useState } from 'react';
import './App.css';
import { ScoreBoard } from './components/ScoreBoard';
import { Board } from './components/Board';
import { ResetButton } from './components/ResetButton';



function App() {


  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null))
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, setGameOver] = useState(false);



  const handleBoxClick = (boxIdx) => {
    //  Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })

    setBoard(updatedBoard);

    // Check if either player has won the game
    const winner = checkWinner(updatedBoard);
    console.log(winner);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        localStorage.setItem("OWin", JSON.stringify(oScore))
        console.log(oScore);
        setScores({ ...scores, oScore })
      } else {
        let { xScore } = scores;
        xScore += 1;
        localStorage.setItem("XWin", JSON.stringify(xScore))
        console.log(xScore);
        setScores({ ...scores, xScore })
      }
    }

    // Step 3: Change active player
    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));

  }
  const resetResult = () => {
    localStorage.setItem("XWin", 0)
    localStorage.setItem("OWin", 0)
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} resetResult={resetResult} />
    </div>
  );
}

export default App;
