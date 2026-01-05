"use client";

import React, { useState, useEffect } from "react";
import { TaskLayout } from "@/components/TaskLayout";
import { useGameStore } from "@/store/useGameStore";
import { generateSpatialQuestion, SpatialQuestion } from "@/utils/spatialLogic";
import { motion } from "framer-motion";

const SymbolR = ({
  mirrored,
  rotation,
}: {
  mirrored: boolean;
  rotation: number;
}) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      transition={{ duration: 0.5 }}
      className="w-24 h-24 flex items-center justify-center bg-white border-2 border-slate-300 rounded-lg shadow-sm"
    >
      <span
        className="text-6xl font-serif font-bold text-slate-800 select-none"
        style={{
          transform: mirrored ? "scaleX(-1)" : "none",
          display: "inline-block",
        }}
      >
        R
      </span>
    </motion.div>
  );
};

export default function SpatialVisualisationPage() {
  const { incrementScore, setCurrentTask } = useGameStore();
  const [currentQ, setCurrentQ] = useState<SpatialQuestion | null>(null);

  useEffect(() => {
    setCurrentTask("spatial-visualisation");
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewQuestion = () => {
    setCurrentQ(generateSpatialQuestion());
  };

  const handleAnswer = (count: number) => {
    if (!currentQ) return;

    if (count === currentQ.correctCount) {
      incrementScore(1);
    } else {
      incrementScore(0);
    }
    loadNewQuestion();
  };

  if (!currentQ) return null;

  return (
    <TaskLayout title="Spatial Visualisation">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-2xl text-slate-600 mb-8">
            How many pairs are the SAME symbol?
          </h2>

          <div className="flex justify-center gap-16 mb-12">
            {currentQ.pairs.map((pair, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 p-4 bg-slate-100 rounded-xl"
              >
                <SymbolR
                  mirrored={pair.topMirrored}
                  rotation={pair.topRotation}
                />
                <div className="w-full h-px bg-slate-300 my-2"></div>
                <SymbolR
                  mirrored={pair.bottomMirrored}
                  rotation={pair.bottomRotation}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-md">
          {[0, 1, 2].map((num) => (
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
