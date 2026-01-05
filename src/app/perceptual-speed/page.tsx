"use client";

import React, { useState, useEffect } from "react";
import { TaskLayout } from "@/components/TaskLayout";
import { useGameStore } from "@/store/useGameStore";
import {
  generatePerceptualSpeedQuestion,
  PerceptualSpeedQuestion,
} from "@/utils/perceptualSpeedLogic";

export default function PerceptualSpeedPage() {
  const { incrementScore, setCurrentTask } = useGameStore();
  const [currentQ, setCurrentQ] = useState<PerceptualSpeedQuestion | null>(
    null
  );

  useEffect(() => {
    setCurrentTask("perceptual-speed");
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewQuestion = () => {
    setCurrentQ(generatePerceptualSpeedQuestion());
  };

  const handleAnswer = (count: number) => {
    if (!currentQ) return;

    if (count === currentQ.correctCount) {
      incrementScore(1);
    } else {
      decrementScore(1);
    }
    loadNewQuestion();
  };

  if (!currentQ) return null;

  return (
    <TaskLayout title="Perceptual Speed">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-2xl text-slate-600 mb-8">
            How many pairs match?
          </h2>

          <div className="flex justify-center gap-8 mb-12">
            {currentQ.pairs.map((pair, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center text-4xl font-serif font-bold text-slate-800 shadow-sm">
                  {pair.top}
                </div>
                <div className="w-20 h-20 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center text-4xl font-serif font-bold text-slate-800 shadow-sm">
                  {pair.bottom}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 w-full max-w-2xl">
          {[0, 1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleAnswer(num)}
              className="bg-blue-900 hover:bg-blue-800 text-white text-3xl font-bold py-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </TaskLayout>
  );
}
