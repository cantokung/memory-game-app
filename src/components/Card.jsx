// src/components/Card.jsx
import React from 'react';
import '../styles/Card.css';

const Card = ({ character, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(character)}>
      <div className="card-inner">
        <img src={character.image} alt={character.name} className="card-image" />
        <div className="card-name">{character.name}</div>
      </div>
    </div>
  );
};

export default Card;