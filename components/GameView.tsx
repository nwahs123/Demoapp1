"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import gameContent from "@/data/gameContent.json";

type GameViewProps = {
    onComplete: (scores: { fresh: number; warm: number }) => void;
};

export default function GameView({ onComplete }: GameViewProps) {
    const [currentQuestionId, setCurrentQuestionId] = useState("q1_entrance");
    const [scores, setScores] = useState({ fresh: 0, warm: 0 });

    const currentQuestion = gameContent.questions.find(
        (q) => q.id === currentQuestionId
    );

    const handleChoice = (choice: any) => {
        // Update scores
        const newScores = {
            fresh: scores.fresh + choice.impact.fresh,
            warm: scores.warm + choice.impact.warm,
        };
        setScores(newScores);

        // Navigate
        if (choice.nextId === "end") {
            onComplete(newScores);
        } else {
            setCurrentQuestionId(choice.nextId);
        }
    };

    if (!currentQuestion) return null;

    return (
        <div className="w-full max-w-2xl mx-auto px-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="flex flex-col gap-8"
                >
                    <h2 className="text-2xl md:text-3xl font-serif leading-relaxed text-center">
                        {currentQuestion.scenario}
                    </h2>

                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                        {currentQuestion.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleChoice(choice)}
                                className="group relative flex flex-col items-center text-left bg-white/50 hover:bg-white border border-[#A68B6C]/20 hover:border-[#A68B6C] transition-all duration-300 rounded-sm shadow-sm hover:shadow-md overflow-hidden"
                            >
                                <div className="w-full aspect-[4/3] overflow-hidden">
                                    <img
                                        src={choice.image}
                                        alt={choice.text}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-3 md:p-6 w-full flex items-center justify-between gap-2 md:gap-4">
                                    <span className="relative z-10 text-sm md:text-lg font-sans font-light tracking-wide group-hover:text-[#A68B6C] transition-colors line-clamp-2">
                                        {choice.text}
                                    </span>
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#A68B6C] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 shrink-0" />
                                </div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
