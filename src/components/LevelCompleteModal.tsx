import React from 'react';
import { Trophy, ArrowRight, Star, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelCompleteModalProps {
  isOpen: boolean;
  levelNumber: number;
  levelName: string;
  flagScore: number;
  totalScore: number;
  coinsCollected: number;
  onNextLevel: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  isOpen,
  levelNumber,
  levelName,
  flagScore,
  totalScore,
  coinsCollected,
  onNextLevel,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getHeightText = () => {
    if (flagScore >= 5000) return '🌟 PERFECT TOP POLE LANDING! (+5,000 Pts)';
    if (flagScore >= 2000) return '⭐ GREAT UPPER POLE LANDING! (+2,000 Pts)';
    return '👍 POLE REACHED! (+500 Pts)';
  };

  return (
    <div id="level-complete-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center text-white relative">
        {/* Title */}
        <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
        </div>

        <h2 className="text-3xl font-black font-mono text-amber-400 tracking-tight">
          LEVEL {levelNumber} CLEARED!
        </h2>
        <p className="text-sm text-slate-300 mt-1 font-semibold">{levelName}</p>

        {/* Flagpole Height Bonus Badge */}
        <div className="my-5 bg-slate-800/90 border border-amber-500/40 rounded-2xl p-4 shadow-inner">
          <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            Flagpole Precision Bonus
          </p>
          <p className="text-lg font-extrabold text-emerald-400 font-mono mt-1">
            {getHeightText()}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-700/60 font-mono">
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-slate-400">Total Coins</span>
              <div className="flex items-center gap-1 text-yellow-300 font-bold text-base mt-0.5">
                <Coins className="w-4 h-4 fill-yellow-400" />
                <span>{coinsCollected}</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-slate-400">Total Score</span>
              <div className="flex items-center gap-1 text-amber-300 font-bold text-base mt-0.5">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{totalScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Level Button */}
        <button
          id="btn-next-level"
          onClick={onNextLevel}
          className="w-full bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black py-3.5 px-6 rounded-2xl text-base shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Continue to Level {levelNumber + 1}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
