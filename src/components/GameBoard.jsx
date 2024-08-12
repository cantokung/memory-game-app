// src/components/GameBoard.jsx
import React from 'react';
import Card from './Card';
import '../styles/GameBoard.css';

const GameBoard = ({ characters, onCardClick }) => {
  return (
    <div className="game-board">
      {characters.map((character) => (
        <Card
          key={character.id}
          character={character}
          onClick={() => onCardClick(character)}
        />
      ))}
    </div>
  );
};

export default GameBoard;