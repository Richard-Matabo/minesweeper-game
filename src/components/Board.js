import React, { useState, useEffect } from 'react';
import BoardCell from './BoardCell';

const Board = ({ size, mineCount, gameOver, onRestart }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    generateBoard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]); // Added gameOver to useEffect dependency array

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

  // Function to handle cell click and reveal cell
  const revealCell = (row, col) => {
    if (gameOver) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];

    // Do nothing if already revealed
    if (cell.revealed) return; 

    cell.revealed = true;
    if (cell.mine) {
      // Pass newBoard to handleGameOver
      handleGameOver(newBoard); 
      return;
    }

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

  // Function to handle game over
  const handleGameOver = (newBoard) => {
    onRestart(); // Call onRestart function to reset the game state
    const restartGame = window.confirm('You lost! Do you wish to play again?');
    if (restartGame) {
      // Regenerate board if user wants to play again
      generateBoard(); 
    } else {
      // Otherwise, keep the current board state
      setBoard(newBoard); 
    }
    
    // Check if all non-mine cells have been revealed
    const allNonMineRevealed = newBoard.every(row => row.every(cell => !cell.mine || cell.revealed));

    // If all non-mine cells have been revealed and the game is not over, show a congratulatory message
    if (allNonMineRevealed && !gameOver) {
      window.alert('Congratulations for your effort! You win the game! 😊');
    }
  };

  // Function to count neighboring mines
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

export default Board;
