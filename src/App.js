// App.js
import React, { useState } from 'react';
import './App.css';
import Instructions from './components/Instructions';
import Board from './components/Board';

const App = () => {
  // State for tracking game over status
  const [gameOver, setGameOver] = useState(false); 

  // Add key state to force remount
  const [key, setKey] = useState(0); 
  
  // State for toggling help visibility
  const [helpVisible, setHelpVisible] = useState(false); 

  const toggleHelp = () => {
    
    // Toggle help visibility
    setHelpVisible(!helpVisible); 
  };

  const handleRestart = () => {
    // Reset game over status
    setGameOver(false); 
    
    // Update key to force remount
    setKey(prevKey => prevKey + 1); 
  };

  return (
    <div className="App">
      <h1>Minesweeper Game</h1>
      <Instructions />
      {/* Show help section if helpVisible state is true */}
      {helpVisible && (
        <div className="game-help">  
          <h3>Game Help:</h3>
          <p>Reveal all cells except the mines to win the game.</p>
          <p>The number on a revealed cell indicates the number of mines in the adjacent cells.</p>
        </div>
      )}
      {/* Button to restart the game */}
      <button onClick={handleRestart}>Restart Game</button>
      {/* Button to toggle help visibility */}
      <button onClick={toggleHelp}>{helpVisible ? 'Hide Help' : 'Show Help'}</button><br />
      {/* Board component with key prop to force remount */}
      <Board key={key} size={12} mineCount={0.1} gameOver={gameOver} onRestart={handleRestart} />      
    </div>
  );
};

export default App;
