// src/components/DebugInfo.jsx

import React from 'react';

const DebugInfo = ({ characters }) => {
  return (
    <div className="debug-info">
      <h2>Debug Information</h2>
      <p>Total characters loaded: {characters.length}</p>
      <h3>Character Details:</h3>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            {character.name} - Episodes: {character.episode.length}, Image: {character.image}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebugInfo;