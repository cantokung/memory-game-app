// src/utils/api.js

const BASE_URL = 'https://rickandmortyapi.com/api/character';

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all characters
export const fetchAllCharacters = async () => {
  let allCharacters = [];
  let nextPage = `${BASE_URL}`;

  try {
    while (nextPage) {
      const response = await fetch(nextPage);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      allCharacters = [...allCharacters, ...data.results];
      nextPage = data.info.next;
      // Add a small delay between page requests
      await delay(300);
    }
    return allCharacters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

// Validate image URL
const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Filter and get top characters
export const getTopCharacters = async (characters, n) => {
  const validCharacters = [];
  
  for (const character of characters) {
    const isValid = await validateImageUrl(character.image);
    if (isValid) {
      validCharacters.push(character);
    }
    if (validCharacters.length >= n) break;
    // Add a small delay between image validations
    await delay(100);
  }

  return validCharacters
    .sort((a, b) => b.episode.length - a.episode.length)
    .slice(0, n);
};


export const fetchCharacterByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/?name=${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results && data.results.length > 0 ? data.results[0] : null;
  } catch (error) {
    console.error(`Error fetching character ${name}:`, error);
    return null;
  }
};