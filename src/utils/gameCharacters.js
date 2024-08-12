// src/utils/gameCharacters.js

export const GAME_CHARACTERS = [
    "Rick Sanchez", "Morty Smith", "Summer Smith", "Beth Smith", "Jerry Smith",
    "Mr. Poopybutthole", "Birdperson", "Squanchy", "Mr. Meeseeks", "Evil Morty",
    "Scary Terry", "Unity", "Snuffles (Snowball)", "Krombopulos Michael",
    "Abradolf Lincler", "Pickle Rick", "Tiny Rick", "Jaguar", "Noob-Noob",
    "Phoenixperson", "Tammy Guetermann", "Jessica", "Mr. Goldenfold",
    "Principal Vagina", "Revolio Clockberg Jr.", "Cousin Nicky", "Scroopy Noopers",
    "King Jellybean", "Gazorpazorpfield", "Arthricia", "Zeep Xanflorp", "Ice-T",
    "Fart", "Conroy", "Mr. Needful", "Hemorrhage", "Morty Jr.",
    "Ants in my Eyes Johnson", "Ghost in a Jar", "Slow Mobius", "Shleemypants",
    "Glootie", "Mr. Nimbus", "Planetina", "Naruto Smith", "Million Ants",
    "Supernova", "Alan Rails", "Vance Maximus", "Crocubot"
  ];
  
  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  export const getGameCharacters = (difficulty) => {
    let numberOfCharacters;
    switch (difficulty) {
      case 'easy':
        numberOfCharacters = 5;
        break;
      case 'medium':
        numberOfCharacters = 10;
        break;
      case 'hard':
        numberOfCharacters = 15;
        break;
      case 'hardcore':
        numberOfCharacters = 20;
        break;
      default:
        numberOfCharacters = 10; // Default to medium if an invalid difficulty is provided
    }
  
    // Shuffle the array and select the first `numberOfCharacters`
    return shuffleArray([...GAME_CHARACTERS]).slice(0, numberOfCharacters);
  };