"use client";

import React, { useState, useEffect } from "react";
import { TaskLayout } from "@/components/TaskLayout";
import { useGameStore } from "@/store/useGameStore";
import {
  generateNumberSpeedQuestion,
  NumberSpeedQuestion,
} from "@/utils/numberSpeedLogic";

export default function NumberSpeedPage() {
  const { incrementScore, setCurrentTask } = useGameStore();
  const [currentQ, setCurrentQ] = useState<NumberSpeedQuestion | null>(null);

  useEffect(() => {
    setCurrentTask("number-speed");
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewQuestion = () => {
    setCurrentQ(generateNumberSpeedQuestion());
  };

  const handleAnswer = (num: number) => {
    if (!currentQ) return;

    if (num === currentQ.correctAnswer) {
      incrementScore(1);
    } else {
      incrementScore(0);
    }
    loadNewQuestion();
  };

  if (!currentQ) return null;

  return (
    <TaskLayout title="Number Speed & Accuracy">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-2xl text-slate-600 mb-4">
            Select the number furthest from the middle number
          </h2>
        </div>

        <div className="flex justify-center gap-8 w-full">
          {currentQ.numbers.map((num, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(num)}
              className="w-32 h-32 bg-white border-4 border-blue-900 text-blue-900 hover:bg-blue-50 text-5xl font-bold rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </TaskLayout>
  );
}
