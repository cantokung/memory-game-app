// src/components/Header.jsx
import React from 'react';
import '../styles/Header.css';

const Header = ({ difficulty, onDifficultyChange }) => {
  return (
    <header className="header">
      <h1>Rick and Morty Memory Game</h1>
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="hardcore">Hardcore</option>
        </select>
      </div>
    </header>
  );
};

export default Header;