// src/components/CharacterList.jsx

import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters = [];
      let nextPage = BASE_URL;

      while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        nextPage = data.info.next;
      }

      setCharacters(allCharacters);
      setLoading(false);
    };

    fetchAllCharacters();
  }, []);

  if (loading) {
    return <div>Loading characters...</div>;
  }

  return (
    <div>
      <h2>All Rick and Morty Characters</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;