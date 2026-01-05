"use client";

import React, { useState, useEffect } from "react";
import { TaskLayout } from "@/components/TaskLayout";
import { useGameStore } from "@/store/useGameStore";
import {
  generateWordMeaningQuestion,
  WordMeaningQuestion,
} from "@/utils/wordMeaningLogic";

export default function WordMeaningPage() {
  const { incrementScore, setCurrentTask } = useGameStore();
  const [currentQ, setCurrentQ] = useState<WordMeaningQuestion | null>(null);

  useEffect(() => {
    setCurrentTask("word-meaning");
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewQuestion = () => {
    setCurrentQ(generateWordMeaningQuestion());
  };

  const handleAnswer = (word: string) => {
    if (!currentQ) return;

    if (word === currentQ.oddOneOut) {
      incrementScore(1);
    } else {
      incrementScore(0);
    }
    loadNewQuestion();
  };

  if (!currentQ) return null;

  return (
    <TaskLayout title="Word Meaning">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-2xl text-slate-600 mb-4">
            Select the odd one out
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 w-full">
          {currentQ.words.map((word, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(word)}
              className="flex-1 bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-50 text-2xl font-bold py-8 px-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-md"
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </TaskLayout>
  );
}
