import React from 'react';
import { RotateCcw, Frown } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  coins: number;
  onRetryLevel: () => void;
  onRestartGame: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  coins,
  onRetryLevel,
  onRestartGame,
}) => {
  if (!isOpen) return null;

  return (
    <div id="game-over-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-rose-600/60 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center text-white relative">
        <div className="w-16 h-16 bg-rose-500/20 border-2 border-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Frown className="w-10 h-10 text-rose-400 animate-pulse" />
        </div>

        <h2 className="text-3xl font-black font-mono text-rose-500 tracking-tight">
          GAME OVER!
        </h2>
        <p className="text-sm text-slate-300 mt-1 font-medium">
          Out of lives! Don't give up, Hero!
        </p>

        <div className="my-5 bg-slate-800/80 border border-slate-700 rounded-2xl p-4 font-mono">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <span className="text-xs text-slate-400">Final Score</span>
              <p className="text-xl font-extrabold text-amber-300 mt-0.5">{score}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Total Coins</span>
              <p className="text-xl font-extrabold text-yellow-300 mt-0.5">{coins}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            id="btn-retry-level"
            onClick={onRetryLevel}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-3 px-6 rounded-2xl text-sm shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Level Again (+3 Lives)</span>
          </button>

          <button
            id="btn-restart-game"
            onClick={onRestartGame}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-2.5 px-6 rounded-2xl text-xs transition active:scale-95"
          >
            Restart From Level 1
          </button>
        </div>
      </div>
    </div>
  );
};
