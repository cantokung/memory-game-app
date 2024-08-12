// src/components/Scoreboard.jsx
import React from 'react';
import '../styles/Scoreboard.css';

const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className="scoreboard">
      <div className="score">
        <span>Score:</span>
        <span>{score}</span>
      </div>
      <div className="best-score">
        <span>Best:</span>
        <span>{bestScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;