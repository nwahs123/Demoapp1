"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameView from "@/components/GameView";
import ResultView from "@/components/ResultView";

type GameState = "landing" | "game" | "result";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [finalScores, setFinalScores] = useState({ fresh: 0, warm: 0 });

  const handleGameComplete = (scores: { fresh: number; warm: number }) => {
    setFinalScores(scores);
    setGameState("result");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F7] text-[#2D2D2D] overflow-hidden relative">
      {/* Background Ambience (Optional: subtle gradient or texture) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-b from-transparent to-[#A68B6C]/5" />

      <AnimatePresence mode="wait">
        {gameState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-12 text-center z-10"
          >
            <div className="space-y-4">
              <h2 className="text-sm uppercase tracking-[0.3em] text-[#A68B6C]">
                Lynk Fragrances
              </h2>
              <h1 className="text-4xl md:text-7xl font-serif text-[#2D2D2D]">
                The Scent of You
              </h1>
            </div>

            <button
              onClick={() => setGameState("game")}
              className="group relative px-12 py-4 bg-[#2D2D2D] text-white uppercase tracking-widest text-sm hover:bg-[#A68B6C] transition-all duration-500 ease-out overflow-hidden rounded-sm"
            >
              <span className="relative z-10">Begin Journey</span>
            </button>
          </motion.div>
        )}

        {gameState === "game" && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full z-10"
          >
            <GameView onComplete={handleGameComplete} />
          </motion.div>
        )}

        {gameState === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full z-10"
          >
            <ResultView scores={finalScores} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
