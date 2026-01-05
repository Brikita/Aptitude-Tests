"use client";

import Link from "next/link";
import { useGameStore } from "@/store/useGameStore";
import { Play, Brain, Zap, Calculator, BookOpen, Box } from "lucide-react";

export default function Home() {
  const { startGame, resetGame } = useGameStore();

  const handleStart = () => {
    resetGame();
    startGame();
  };

  const tasks = [
    {
      id: "reasoning",
      title: "Reasoning",
      description: "Compare two people based on a statement.",
      icon: Brain,
    },
    {
      id: "perceptual-speed",
      title: "Perceptual Speed",
      description: "Identify matching pairs in a set of 4.",
      icon: Zap,
    },
    {
      id: "number-speed",
      title: "Number Speed & Accuracy",
      description: "Find the number furthest from the median.",
      icon: Calculator,
    },
    {
      id: "word-meaning",
      title: "Word Meaning",
      description: "Identify the word that doesn't fit.",
      icon: BookOpen,
    },
    {
      id: "spatial-visualisation",
      title: "Spatial Visualisation",
      description: "Mental rotation and matching.",
      icon: Box,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          GIA Aptitude Master
        </h1>
        <p className="text-slate-600 mb-8 text-lg">
          Practice for the Thomas General Intelligence Assessment. Consists of 5
          distinct cognitive tests.
        </p>

        <div className="grid gap-4 mb-8">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left flex items-center gap-4"
            >
              <div className="bg-blue-100 p-2 rounded-full text-blue-900">
                <task.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{task.title}</h3>
                <p className="text-sm text-slate-500">{task.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/reasoning"
          onClick={handleStart}
          className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
        >
          <Play className="w-5 h-5" />
          Start Assessment
        </Link>
      </div>
    </div>
  );
}
