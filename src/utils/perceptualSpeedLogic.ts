export interface LetterPair {
  top: string;
  bottom: string;
  isMatch: boolean;
}

export interface PerceptualSpeedQuestion {
  pairs: LetterPair[];
  correctCount: number;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generatePerceptualSpeedQuestion = (): PerceptualSpeedQuestion => {
  const pairs: LetterPair[] = [];
  let correctCount = 0;

  for (let i = 0; i < 4; i++) {
    // Decide if this pair should be a match (50% chance)
    const isMatch = Math.random() < 0.5;

    // Pick first letter
    const charIndex1 = Math.floor(Math.random() * LETTERS.length);
    const char1 = LETTERS[charIndex1];

    let char2 = "";

    if (isMatch) {
      // Same letter, random case for both
      // Actually, let's just pick the same letter and randomize case for display
      // But the logic says "Case-insensitive equality".
      // So 'A' and 'a' is a match. 'A' and 'A' is a match.

      // Let's pick the second letter to be the same character
      const charIndex2 = charIndex1;
      char2 = LETTERS[charIndex2];
      correctCount++;
    } else {
      // Different letter
      let charIndex2 = Math.floor(Math.random() * LETTERS.length);
      while (charIndex2 === charIndex1) {
        charIndex2 = Math.floor(Math.random() * LETTERS.length);
      }
      char2 = LETTERS[charIndex2];
    }

    // Randomize case for display
    const top = Math.random() < 0.5 ? char1.toUpperCase() : char1.toLowerCase();
    const bottom =
      Math.random() < 0.5 ? char2.toUpperCase() : char2.toLowerCase();

    pairs.push({ top, bottom, isMatch });
  }

  return {
    pairs,
    correctCount,
  };
};
