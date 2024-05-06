// Home.js
import React, { useState } from 'react';
import '../App.css'; // Importing CSS styles
import Instructions from './Instructions'; // Importing Instructions component
import Board from './Board'; // Importing Board component

const Home = () => {
  const [gameOver, setGameOver] = useState(false); // State for game over status

  // Function to handle game restart
  const handleRestart = () => {
    setGameOver(false); // Set game over status to false to restart the game
  };

  return (
    <div className="App"> {/* Main container */}
      <Instructions /> {/* Render Instructions component */}
      <Board size={12} mineCount={0.1} gameOver={gameOver} onRestart={handleRestart} /> {/* Render Board component with specified props */}
    </div>
  );
};

export default Home; // Export the Home component
