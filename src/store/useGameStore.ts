import { create } from 'zustand';

export type TaskId = 'reasoning' | 'perceptual-speed' | 'number-speed' | 'word-meaning' | 'spatial-visualisation' | null;

interface GameState {
  score: number;
  currentTask: TaskId;
  overallTimeRemaining: number; // in seconds
  isGameActive: boolean;
  
  // Actions
  setScore: (score: number) => void;
  incrementScore: (amount: number) => void;
  decrementScore: (amount: number) => void;
  setCurrentTask: (task: TaskId) => void;
  setOverallTimeRemaining: (time: number) => void;
  decrementOverallTimer: () => void;
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  currentTask: null,
  overallTimeRemaining: 45 * 60, // 45 minutes default
  isGameActive: false,

  setScore: (score) => set({ score }),
  incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
  decrementScore: (amount) => set((state) => ({ score: state.score - amount })),
  setCurrentTask: (task) => set({ currentTask: task }),
  setOverallTimeRemaining: (time) => set({ overallTimeRemaining: time }),
  decrementOverallTimer: () => set((state) => ({ overallTimeRemaining: Math.max(0, state.overallTimeRemaining - 1) })),
  startGame: () => set({ isGameActive: true }),
  endGame: () => set({ isGameActive: false, currentTask: null }),
  resetGame: () => set({ 
    score: 0, 
    currentTask: null, 
    overallTimeRemaining: 45 * 60, 
    isGameActive: false 
  }),
}));
