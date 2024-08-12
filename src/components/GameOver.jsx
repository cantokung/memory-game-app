// src/components/GameOver.jsx
import React from 'react';
import '../styles/GameOver.css';

const GameOver = ({ score, onRestart, isWin }) => {
  return (
    <div className="game-over">
      <h2>{isWin ? "You Win!" : "Game Over"}</h2>
      <p>Your score: {score}</p>
      {isWin && <p>Congratulations! You've matched all the characters!</p>}
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOver;