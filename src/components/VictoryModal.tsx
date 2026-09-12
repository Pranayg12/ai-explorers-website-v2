import React from 'react';
import { Heart, Trophy, RotateCcw, Star, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VictoryModalProps {
  isOpen: boolean;
  score: number;
  coins: number;
  greenStars: number;
  onRestartGame: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  score,
  coins,
  greenStars,
  onRestartGame,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="victory-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-center text-white relative">
        <div className="w-20 h-20 bg-rose-500/20 border-2 border-rose-400 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-xl">
          <Heart className="w-12 h-12 text-rose-400 fill-rose-500 animate-bounce" />
        </div>

        <div className="flex items-center justify-center gap-1 text-amber-400 font-extrabold text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>PRINCESS PEACH IS SAVED!</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2 className="text-3xl font-black font-mono text-amber-300 mt-1 tracking-tight">
          YOU DEFEATED BOWSER!
        </h2>
        <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed">
          Bowser fell into the bubbling lava! Princess Peach is safely rescued and the Mushroom Kingdom is saved thanks to your heroism!
        </p>

        {/* Stats Summary */}
        <div className="my-5 bg-slate-800/90 border border-amber-500/40 rounded-2xl p-4 font-mono">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Final Score</span>
              <p className="text-lg font-black text-amber-300 mt-0.5">{score}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Gold Coins</span>
              <p className="text-lg font-black text-yellow-300 mt-0.5">{coins}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Green Stars</span>
              <p className="text-lg font-black text-emerald-400 mt-0.5">{greenStars}</p>
            </div>
          </div>
        </div>

        <button
          id="btn-victory-replay"
          onClick={onRestartGame}
          className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 hover:opacity-90 text-slate-950 font-black py-3.5 px-6 rounded-2xl text-base shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again From Level 1</span>
        </button>
      </div>
    </div>
  );
};
