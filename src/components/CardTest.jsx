// src/components/CardTest.jsx

import React, { useState, useEffect } from 'react';
import Card from './Card';
import DebugInfo from './DebugInfo';
import { fetchAllCharacters, getTopCharacters } from '../utils/api.js';
import '../styles/CardTest.css';

const CardTest = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const allCharacters = await fetchAllCharacters();
      const topCharacters = await getTopCharacters(allCharacters, 50);
      setCharacters(topCharacters);
      setLoading(false);
    };
    loadCharacters();
  }, []);

  const handleCardClick = (character) => {
    console.log('Clicked character:', character.name);
    // Here you can add logic for the memory game
  };

  if (loading) {
    return <div>Loading characters... This may take a moment.</div>;
  }

  return (
    <div className="card-test-container">
      <h1>Top {characters.length} Rick and Morty Characters</h1>
      <button onClick={() => setShowDebug(!showDebug)}>
        {showDebug ? 'Hide' : 'Show'} Debug Info
      </button>
      {showDebug && <DebugInfo characters={characters} />}
      <div className="card-grid">
        {characters.map((character) => (
          <Card key={character.id} character={character} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default CardTest;