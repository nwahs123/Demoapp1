"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Lock, Check } from "lucide-react";
import gameContent from "@/data/gameContent.json";

type ResultViewProps = {
    scores: { fresh: number; warm: number };
};

export default function ResultView({ scores }: ResultViewProps) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [email, setEmail] = useState("");
    const [isFollowed, setIsFollowed] = useState(false);

    // Determine result
    const result =
        scores.fresh >= scores.warm
            ? gameContent.outcomes.find((o) => o.condition === "fresh")
            : gameContent.outcomes.find((o) => o.condition === "warm");

    if (!result) return null;

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && isFollowed) {
            setIsUnlocked(true);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: result.title,
                    text: `I am ${result.title}. Discover your scent archetype with Lynk.`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Error sharing", error);
            }
        } else {
            // Fallback
            navigator.clipboard.writeText(
                `I am ${result.title}. Discover your scent archetype with Lynk: ${window.location.href}`
            );
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto px-6 py-12 flex flex-col gap-8 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 flex flex-col items-center"
            >
                <h2 className="text-sm tracking-[0.2em] text-[#A68B6C] uppercase font-sans">
                    Your Archetype
                </h2>

                {/* Tarot Card Display */}
                <div className="relative w-48 md:w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-xl border-4 border-[#A68B6C]/20 bg-[#F9F9F7]">
                    <img
                        src={result.tarotImage}
                        alt={result.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border border-[#A68B6C]/30 m-2 rounded-sm pointer-events-none" />
                </div>

                <h1 className="text-3xl md:text-4xl font-serif text-[#2D2D2D] mt-4">{result.title}</h1>
                <p className="text-lg font-light leading-relaxed text-[#2D2D2D]/80 max-w-lg">
                    {result.desc}
                </p>
            </motion.div>

            <div className="border-t border-[#A68B6C]/20 my-4"></div>

            {!isUnlocked ? (
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleUnlock}
                    className="flex flex-col gap-6 bg-white p-8 rounded-sm shadow-sm border border-[#A68B6C]/10"
                >
                    <div className="flex items-center justify-center gap-2 text-[#A68B6C] mb-2">
                        <Lock className="w-5 h-5" />
                        <span className="text-sm uppercase tracking-widest">
                            Unlock Your Profile
                        </span>
                    </div>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 bg-[#F9F9F7] border border-[#A68B6C]/20 rounded-sm focus:outline-none focus:border-[#A68B6C] transition-colors font-sans"
                    />

                    <label className="flex items-center gap-3 text-sm text-left cursor-pointer group">
                        <div className={`w-5 h-5 border border-[#A68B6C] rounded-sm flex items-center justify-center transition-colors ${isFollowed ? 'bg-[#A68B6C]' : 'bg-transparent'}`}>
                            {isFollowed && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <input
                            type="checkbox"
                            checked={isFollowed}
                            onChange={(e) => setIsFollowed(e.target.checked)}
                            className="hidden"
                        />
                        <span className="text-[#2D2D2D]/80 group-hover:text-[#2D2D2D] transition-colors">
                            I follow @LynkArtisan on Instagram
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={!email || !isFollowed}
                        className="w-full bg-[#2D2D2D] text-white py-4 uppercase tracking-widest text-sm hover:bg-[#A68B6C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Unlock My Archetype
                    </button>
                </motion.form>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="relative aspect-square w-full max-w-[200px] mx-auto bg-[#F0F0F0] overflow-hidden rounded-sm">
                        {/* Placeholder for product image */}
                        <img
                            src={result.productImage}
                            alt={result.productName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-serif">{result.productName}</h3>
                        <div className="inline-block bg-[#A68B6C]/10 px-6 py-3 rounded-sm border border-[#A68B6C]/30">
                            <p className="text-xs uppercase tracking-widest text-[#A68B6C] mb-1">
                                Your Exclusive Code
                            </p>
                            <p className="text-xl font-mono font-bold text-[#2D2D2D]">
                                LYNK-RAMPAGE-15
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 w-full border border-[#2D2D2D] text-[#2D2D2D] py-3 uppercase tracking-widest text-sm hover:bg-[#2D2D2D] hover:text-white transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        Share Result
                    </button>
                </motion.div>
            )}
        </div>
    );
}
