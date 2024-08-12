// src/components/CharacterImageValidator.jsx

import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const topCharacters = [
  "Rick Sanchez", "Morty Smith", "Summer Smith", "Beth Smith", "Jerry Smith",
  "Mr. Poopybutthole", "Birdperson", "Squanchy", "Mr. Meeseeks", "Evil Morty",
  "Scary Terry", "Unity", "Snuffles (Snowball)", "Krombopulos Michael",
  "Abradolf Lincler", "Pickle Rick", "Tiny Rick", "Jaguar", "Noob-Noob",
  "Phoenixperson", "Tammy Guetermann", "Jessica", "Mr. Goldenfold",
  "Principal Vagina", "Gear Head", "Revolio Clockberg Jr.", "Cousin Nicky",
  "Scroopy Noopers", "King Jellybean", "Gazorpazorpfield", "Arthricia",
  "Zeep Xanflorp", "Ice-T", "Cromulons", "Fart", "Roy", "Mr. Needful",
  "Hemorrhage", "Morty Jr.", "Ants in my Eyes Johnson", "Plumbuses",
  "Ghost in a Jar", "Slow Mobius", "Shleemypants", "Glootie", "Mr. Nimbus",
  "Space Beth", "Planetina", "Naruto Smith", "Million Ants", "Supernova",
  "Alan Rails", "Vance Maximus", "Crocubot", "Worldender", "Cornvelious Daniel",
  "Concerto", "Risotto Groupon", "Simple Rick", "Toxic Rick", "Toxic Morty",
  "Froopyland Clone Tommy", "Kiara", "Dr. Wong", "Heistotron", "Randotron",
  "Story Lord", "Tickets Please Guy", "Gaia", "Gotron", "Two Crows"
];

const CharacterImageValidator = () => {
  const [validCharacters, setValidCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateCharacters = async () => {
      const validChars = [];
      for (const name of topCharacters) {
        try {
          const response = await fetch(`${BASE_URL}/?name=${encodeURIComponent(name)}`);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const char = data.results[0];
            const imgResponse = await fetch(char.image);
            if (imgResponse.ok) {
              validChars.push(char);
            }
          }
        } catch (error) {
          console.error(`Error validating ${name}:`, error);
        }
        if (validChars.length >= 50) break;
      }
      setValidCharacters(validChars);
      setLoading(false);
    };

    validateCharacters();
  }, []);

  if (loading) {
    return <div>Validating character images...</div>;
  }

  return (
    <div>
      <h2>Top 50 Rick and Morty Characters with Valid Images</h2>
      <ul>
        {validCharacters.map(char => (
          <li key={char.id}>
            {char.name}
            <img src={char.image} alt={char.name} style={{width: '50px', height: '50px'}} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterImageValidator;