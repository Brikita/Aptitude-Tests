"use client";

import React, { useState, useEffect } from "react";
import { TaskLayout } from "@/components/TaskLayout";
import { useGameStore } from "@/store/useGameStore";
import {
  generateReasoningQuestion,
  ReasoningQuestion,
} from "@/utils/reasoningLogic";
import { ArrowRight } from "lucide-react";

export default function ReasoningPage() {
  const { incrementScore, setCurrentTask } = useGameStore();
  const [currentQ, setCurrentQ] = useState<ReasoningQuestion | null>(null);
  const [step, setStep] = useState<"statement" | "question">("statement");

  useEffect(() => {
    setCurrentTask("reasoning");
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewQuestion = () => {
    setCurrentQ(generateReasoningQuestion());
    setStep("statement");
  };

  const handleContinue = () => {
    setStep("question");
  };

  const handleAnswer = (answer: string) => {
    if (!currentQ) return;

    if (answer === currentQ.correctAnswer) {
      incrementScore(1);
    } else {
      incrementScore(0);
    }
    loadNewQuestion();
  };

  if (!currentQ) return null;

  return (
    <TaskLayout title="Reasoning">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        {step === "statement" && (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-4xl font-bold text-slate-800 mb-12 leading-tight">
              {currentQ.statement}
            </h2>
            <button
              onClick={handleContinue}
              className="bg-blue-900 hover:bg-blue-800 text-white text-xl font-bold py-4 px-12 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
            >
              Click to continue <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {step === "question" && (
          <div className="text-center w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-4xl font-bold text-slate-800 mb-12">
              {currentQ.question}
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {currentQ.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-50 text-3xl font-bold py-8 px-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </TaskLayout>
  );
}
