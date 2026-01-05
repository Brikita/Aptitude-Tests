export interface SpatialPair {
  topMirrored: boolean;
  topRotation: number; // 0, 90, 180, 270
  bottomMirrored: boolean;
  bottomRotation: number; // 0, 90, 180, 270
  isMatch: boolean;
}

export interface SpatialQuestion {
  pairs: SpatialPair[];
  correctCount: number;
}

export const generateSpatialQuestion = (): SpatialQuestion => {
  const pairs: SpatialPair[] = [];
  let correctCount = 0;

  for (let i = 0; i < 2; i++) {
    // Decide if this pair is a match (same symbol)
    const isMatch = Math.random() < 0.5;
    if (isMatch) correctCount++;

    // Top symbol state
    const topMirrored = Math.random() < 0.5;
    const topRotation = Math.floor(Math.random() * 4) * 90;

    // Bottom symbol state
    // If match, bottom must be same "handedness" as top (so if top is mirrored, bottom is mirrored)
    // If not match, bottom must be opposite "handedness"
    const bottomMirrored = isMatch ? topMirrored : !topMirrored;
    const bottomRotation = Math.floor(Math.random() * 4) * 90;

    pairs.push({
      topMirrored,
      topRotation,
      bottomMirrored,
      bottomRotation,
      isMatch,
    });
  }

  return {
    pairs,
    correctCount,
  };
};
