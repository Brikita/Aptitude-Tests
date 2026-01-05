export interface WordMeaningQuestion {
  words: string[]; // 3 words
  oddOneOut: string;
}

const TRIPLETS = [
  { words: ["Up", "Down", "Street"], odd: "Street" },
  { words: ["Big", "Large", "Yellow"], odd: "Yellow" },
  { words: ["Hot", "Cold", "Paper"], odd: "Paper" },
  { words: ["Start", "Begin", "Apple"], odd: "Apple" },
  { words: ["Love", "Hate", "Chair"], odd: "Chair" },
  { words: ["Fast", "Quick", "Blue"], odd: "Blue" },
  { words: ["Wet", "Dry", "Music"], odd: "Music" },
  { words: ["Happy", "Sad", "Table"], odd: "Table" },
  { words: ["Near", "Far", "Green"], odd: "Green" },
  { words: ["Rich", "Wealthy", "Slow"], odd: "Slow" },
  { words: ["Open", "Close", "Bird"], odd: "Bird" },
  { words: ["High", "Low", "Water"], odd: "Water" },
  { words: ["Buy", "Sell", "Jump"], odd: "Jump" },
  { words: ["Hard", "Soft", "Time"], odd: "Time" },
  { words: ["Old", "New", "Cat"], odd: "Cat" },
  { words: ["Right", "Wrong", "Sky"], odd: "Sky" },
  { words: ["Clean", "Dirty", "Book"], odd: "Book" },
  { words: ["Smart", "Clever", "Rain"], odd: "Rain" },
  { words: ["Day", "Night", "Pen"], odd: "Pen" },
  { words: ["Win", "Lose", "Car"], odd: "Car" },
];

export const generateWordMeaningQuestion = (): WordMeaningQuestion => {
  const triplet = TRIPLETS[Math.floor(Math.random() * TRIPLETS.length)];

  // Shuffle the words
  const shuffledWords = [...triplet.words].sort(() => Math.random() - 0.5);

  return {
    words: shuffledWords,
    oddOneOut: triplet.odd,
  };
};
