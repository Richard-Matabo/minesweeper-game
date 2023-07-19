// // Importing necessary dependencies and styles
import React, { useState, useEffect } from 'react';
import './App.css';


// BoardCell component that represents a single cell in the game board
const BoardCell = ({ cellData, onClick }) => {
  const { row, col, revealed, mine, neighborMines } = cellData;
  const cellStyle = {
    backgroundColor: revealed ? '#ddd' : '#999',
    color: revealed && mine ? 'red' : 'black',
  };

  return (
    <div className="cell" style={cellStyle} onClick={() => onClick(row, col)}>
      {revealed ? (mine ? '💣' : neighborMines) : ''}
    </div>
  );
};


// Board component that represents the game board
const Board = ({ size, mineCount, gameOver, onRestart }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    generateBoard();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


// Function to generate the game board
  const generateBoard = () => {
    const newBoard = [];
    for (let row = 0; row < size; row++) {
      const newRow = [];
      for (let col = 0; col < size; col++) {
        newRow.push({
          row,
          col,
          revealed: false,
          mine: Math.random() < mineCount,
          neighborMines: 0,
        });
      }
      newBoard.push(newRow);
    }
    setBoard(newBoard);
  };


// Function to reveal a cell
  const revealCell = (row, col) => {
    if (gameOver) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.revealed || cell.mine) {
      handleGameOver();
      return;
    }

    cell.revealed = true;
    cell.neighborMines = countNeighborMines(row, col);

    if (cell.neighborMines === 0) {
      revealNeighborCells(row, col, newBoard);
    }

    setBoard(newBoard);
  };

// Function to reveal neighboring cells recursively
  const revealNeighborCells = (row, col, newBoard) => {
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < size && j >= 0 && j < size) {
          const neighborCell = newBoard[i][j];
          if (!neighborCell.revealed && !neighborCell.mine) {
            neighborCell.revealed = true;
            neighborCell.neighborMines = countNeighborMines(i, j);
            if (neighborCell.neighborMines === 0) {
              revealNeighborCells(i, j, newBoard);
            }
          }
        }
      }
    }
  };

  const handleGameOver = () => {
    onRestart();
    const restartGame = window.confirm('You lost! Do you wish to play again?');
    if (restartGame) {
      generateBoard();
    }
   };

  const countNeighborMines = (row, col) => {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < size && j >= 0 && j < size) {
          if (board[i][j].mine) count++;
        }
      }
    }
    return count;
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell) => (
            <BoardCell key={`${cell.row}-${cell.col}`} cellData={cell} onClick={revealCell} />
          ))}
        </div>
      ))}
      {gameOver && <div className="game-over">Game Over!</div>}
    </div>
  );
};


// App component that represents the whole application
const App = () => {
  const [gameOver, setGameOver] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);

  const handleRestart = () => {
    setGameOver(false);
  };

// Function to toggle help visibility
  const toggleHelp = () => {
    setHelpVisible(!helpVisible);
  };

  return (
    <div className="App">
      <h1>Minesweeper Game</h1>
      <div className="instructions">
        <h2>Instructions:</h2>
        <p>Click on a cell to reveal it.</p>
        <p>Avoid clicking on a mine (💣) to win the game.</p>
        <button onClick={toggleHelp}>{helpVisible ? 'Hide Help' : 'Show Help'}</button>
        {helpVisible && (
          <div className="game-help">
            <h3>Game Help:</h3>
            <p>Reveal all cells except the mines to win the game.</p>
            <p>The number on a revealed cell indicates the number of mines in the adjacent cells.</p>
          </div>
        )}
      </div>
      <Board size={12} mineCount={0.1} gameOver={gameOver} onRestart={handleRestart} />
    </div>
  );
};

export default App;





