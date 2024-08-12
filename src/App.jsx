// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import GameOver from './components/GameOver';
import { fetchCharacterByName } from './utils/api';
import { getGameCharacters } from './utils/gameCharacters';
import { shuffleArray } from './utils/helper';
import './App.css';



function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [characters, setCharacters] = useState([]);
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  const resetGame = async () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setClickedCharacters([]);
    try {
      const selectedCharacters = getGameCharacters(difficulty);
      const fetchedCharacters = await Promise.all(
        selectedCharacters.map(name => fetchCharacterByName(name))
      );
      setCharacters(shuffleArray(fetchedCharacters.filter(char => char !== null)));
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (character) => {
    if (clickedCharacters.includes(character.id)) {
      endGame();
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      setClickedCharacters([...clickedCharacters, character.id]);
      setCharacters(shuffleArray([...characters]));
      
      if (newScore === characters.length) {
        endGame(true);
      }
    }
  };

  const endGame = (win = false) => {
    setGameOver(true);
    if (win) {
      console.log("Congratulations! You've won!");
    } else {
      console.log("Game Over!");
    }
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  if (loading) {
    return <div>Loading characters...</div>;
  }

  return (
    <div className="App" style={{ width: '100%', maxWidth: '100%' }}>
      <Header difficulty={difficulty} onDifficultyChange={handleDifficultyChange} />
      <Scoreboard score={score} bestScore={bestScore} />
      <main className="game-container">
        {loading ? (
          <div className="loading">Loading characters...</div>
        ) : gameOver ? (
          <GameOver 
            score={score} 
            onRestart={resetGame} 
            isWin={score === characters.length}
          />
        ) : (
          <GameBoard characters={characters} onCardClick={handleCardClick} />
        )}
      </main>
    </div>
  );
}

export default App;