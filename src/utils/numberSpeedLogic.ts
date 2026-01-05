export interface NumberSpeedQuestion {
  numbers: number[]; // The 3 numbers to display (shuffled)
  correctAnswer: number;
}

export const generateNumberSpeedQuestion = (): NumberSpeedQuestion => {
  let nums: number[] = [];
  let valid = false;
  let answer = 0;

  while (!valid) {
    // Generate 3 distinct numbers between 2 and 30
    const set = new Set<number>();
    while (set.size < 3) {
      set.add(Math.floor(Math.random() * 29) + 2);
    }
    nums = Array.from(set);

    // Sort to find Min, Mid, Max
    const sorted = [...nums].sort((a, b) => a - b);
    const min = sorted[0];
    const mid = sorted[1];
    const max = sorted[2];

    const distMin = Math.abs(mid - min);
    const distMax = Math.abs(max - mid);

    if (distMin !== distMax) {
      valid = true;
      answer = distMax > distMin ? max : min;
    }
  }

  // Shuffle the numbers for display so they aren't always sorted
  const shuffled = [...nums].sort(() => Math.random() - 0.5);

  return {
    numbers: shuffled,
    correctAnswer: answer,
  };
};
