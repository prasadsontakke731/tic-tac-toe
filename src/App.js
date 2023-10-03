
import React, { useState, Suspense } from 'react';
import './App.css';
import Login from './components/Login';

import { useAuth0 } from "@auth0/auth0-react";

const Board = React.lazy(() => import("./components/Board"))
const ScoreBoard = React.lazy(() => import("./components/ScoreBoard"))
const ResetButton = React.lazy(() => import("./components/ResetButton"))
function App() {

  const { loginWithRedirect, logout, isAuthenticated, user, isLoading
  } = useAuth0();

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
        if (isAuthenticated) {

          oScore += 1;
          localStorage.setItem("OWin", JSON.stringify(oScore))
          console.log(oScore);
          setScores({ ...scores, oScore })
        }
      } else {
        let { xScore } = scores;
        if (isAuthenticated) {
          xScore += 1;
          localStorage.setItem("XWin", JSON.stringify(xScore))
          console.log(xScore);
          setScores({ ...scores, xScore })
        }

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

  window.addEventListener("load", () => console.log("loaded"))



  return (
    <div className="App">

      {
        isAuthenticated &&
        <div className='userInfo'>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      }
      {
        isAuthenticated ? <div className='userInfo'><button className='btn-out' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Logout</button></div>

          : <div className="userInfo"><button className='btn' onClick={() => loginWithRedirect()}>Log In</button></div>
      }
      <Suspense fallback={<p>This is Loading...</p>}>
        <ScoreBoard scores={scores} xPlaying={xPlaying} />
        <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
        <ResetButton resetBoard={resetBoard} resetResult={resetResult} />
      </Suspense>
      {/* <Login /> */}
    </div>
  );
}

export default App;
