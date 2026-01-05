"use client";

import React, { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { Timer, Trophy, Home } from "lucide-react";
import Link from "next/link";

interface TaskLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const TaskLayout: React.FC<TaskLayoutProps> = ({ children, title }) => {
  const {
    score,
    attempts,
    overallTimeRemaining,
    decrementOverallTimer,
    isGameActive,
    endGame,
  } = useGameStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && overallTimeRemaining > 0) {
      interval = setInterval(() => {
        decrementOverallTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, overallTimeRemaining, decrementOverallTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={endGame}
            className="text-slate-500 hover:text-blue-900 transition-colors"
          >
            <Home className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        </div>
        <div className="flex items-center gap-2 text-slate-600 font-mono text-lg">
          <Timer className="w-5 h-5" />
          <span>{formatTime(overallTimeRemaining)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 min-h-[600px] flex flex-col relative">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 p-4 flex justify-center">
        <div className="flex items-center gap-2 text-slate-700 font-semibold text-lg">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span>
            Score: {score} / {attempts}
          </span>
        </div>
      </footer>
    </div>
  );
};
