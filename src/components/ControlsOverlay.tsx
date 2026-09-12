import React from 'react';
import { X, ArrowLeft, ArrowRight, ArrowDown, Zap, Flame, MoveUp } from 'lucide-react';

interface ControlsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  // On-screen touch/mouse control callbacks for accessibility
  onInputDown: (action: string) => void;
  onInputUp: (action: string) => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  isOpen,
  onClose,
  onInputDown,
  onInputUp,
}) => {
  return (
    <>
      {/* Help & Instructions Modal */}
      {isOpen && (
        <div id="controls-help-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <div>
                <h2 className="text-xl font-black text-amber-400 font-mono flex items-center gap-2">
                  <span>🎮 HOW TO PLAY & CONTROLS</span>
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-0.5">Welcome to Super Mario Odyssey 2D!</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Close Instructions"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="my-4 space-y-4 text-xs font-sans">
              {/* Objective Box */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 space-y-1.5">
                <h3 className="font-bold text-amber-300 font-mono flex items-center gap-1.5 text-sm">
                  <span>🏆 Main Objective</span>
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Run, jump, and stomp through <strong className="text-amber-200">4 epic levels</strong>! Avoid pits and enemies, collect Gold Coins and Green Stars, reach the flagpole, defeat Bowser, and rescue Princess Peach!
                </p>
              </div>

              {/* Controls List */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-200 font-mono text-sm tracking-wider">GAME CONTROLS</h3>

                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-200 font-medium">Move Left / Right</span>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono font-bold">◄ Left</kbd>
                    <kbd className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono font-bold">► Right</kbd>
                    <span className="text-slate-500 text-[11px]">or A / D</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-200 font-medium">Jump</span>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono font-bold">Spacebar</kbd>
                    <span className="text-slate-500 text-[11px]">or W / ▲</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-amber-300 font-bold font-mono">Double Jump</span>
                    <p className="text-[11px] text-slate-400">Press Jump again while mid-air for extra height!</p>
                  </div>
                  <kbd className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded font-mono font-bold">
                    Space x2
                  </kbd>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-200 font-medium">Sprint / Run Fast</span>
                  <kbd className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded text-sky-300 font-mono font-bold">Shift</kbd>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-rose-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-rose-300 font-bold font-mono">Power-Up / Fireball</span>
                    <p className="text-[11px] text-slate-400">Shoot bouncing fireballs when powered up!</p>
                  </div>
                  <kbd className="px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded font-mono font-bold">
                    Press B
                  </kbd>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-emerald-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-emerald-300 font-bold font-mono">Enter Secret Warp Pipes</span>
                    <p className="text-[11px] text-slate-400">Stand on top of Green Pipes & press Down!</p>
                  </div>
                  <kbd className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded font-mono font-bold">
                    ▼ Down / S
                  </kbd>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-200 font-medium">Pause Game</span>
                  <kbd className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded text-slate-300 font-mono font-bold">P or Esc</kbd>
                </div>
              </div>

              {/* Tips & Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 font-mono text-[11px]">🍄 POWER-UPS</span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Hit <strong className="text-amber-200">? Lucky Blocks</strong> to spawn Mushrooms, Fire Flowers, and Invincible Stars!
                  </p>
                </div>

                <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-emerald-300 font-mono text-[11px]">⭐ CHARACTER SHOP</span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Use coins to unlock <strong>Luigi</strong>, <strong>Peach</strong>, <strong>Toad</strong>, and <strong>Yoshi</strong> with unique jump & float stats!
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-transform active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              LET'S PLAY!
            </button>
          </div>
        </div>
      )}

      {/* On-Screen Touch / Mouse Control Buttons (bottom corner on small/touch screens or always accessible) */}
      <div id="on-screen-controls" className="fixed bottom-3 inset-x-3 z-40 flex items-center justify-between pointer-events-none select-none opacity-85 hover:opacity-100 transition-opacity">
        {/* Left D-Pad: Left, Down (Pipe), Right */}
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur p-2 rounded-2xl border border-slate-700/60 shadow-xl">
          <button
            id="touch-left"
            onMouseDown={() => onInputDown('left')}
            onMouseUp={() => onInputUp('left')}
            onTouchStart={(e) => { e.preventDefault(); onInputDown('left'); }}
            onTouchEnd={(e) => { e.preventDefault(); onInputUp('left'); }}
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-amber-500 text-white flex items-center justify-center font-bold shadow border border-slate-600"
            title="Move Backwards"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            id="touch-down"
            onMouseDown={() => onInputDown('down')}
            onMouseUp={() => onInputUp('down')}
            onTouchStart={(e) => { e.preventDefault(); onInputDown('down'); }}
            onTouchEnd={(e) => { e.preventDefault(); onInputUp('down'); }}
            className="w-10 h-10 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 active:bg-emerald-600 text-emerald-300 flex items-center justify-center font-bold shadow border border-emerald-700/50"
            title="Enter Warp Pipe"
          >
            <ArrowDown className="w-5 h-5" />
          </button>

          <button
            id="touch-right"
            onMouseDown={() => onInputDown('right')}
            onMouseUp={() => onInputUp('right')}
            onTouchStart={(e) => { e.preventDefault(); onInputDown('right'); }}
            onTouchEnd={(e) => { e.preventDefault(); onInputUp('right'); }}
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-amber-500 text-white flex items-center justify-center font-bold shadow border border-slate-600"
            title="Move Forwards"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Right Action Buttons: Sprint (Shift), Powerup (B), Jump (Space) */}
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur p-2 rounded-2xl border border-slate-700/60 shadow-xl">
          <button
            id="touch-sprint"
            onMouseDown={() => onInputDown('sprint')}
            onMouseUp={() => onInputUp('sprint')}
            onTouchStart={(e) => { e.preventDefault(); onInputDown('sprint'); }}
            onTouchEnd={(e) => { e.preventDefault(); onInputUp('sprint'); }}
            className="w-10 h-10 rounded-xl bg-sky-950/80 hover:bg-sky-800 active:bg-sky-600 text-sky-300 flex items-center justify-center font-bold text-xs shadow border border-sky-700/50"
            title="Sprint / Run Fast (Shift)"
          >
            <Zap className="w-5 h-5" />
          </button>

          <button
            id="touch-powerup"
            onMouseDown={() => onInputDown('powerup')}
            onMouseUp={() => onInputUp('powerup')}
            onTouchStart={(e) => { e.preventDefault(); onInputDown('powerup'); }}
            onTouchEnd={(e) => { e.preventDefault(); onInputUp('powerup'); }}
            className="w-11 h-11 rounded-xl bg-rose-950/80 hover:bg-rose-800 active:bg-rose-600 text-rose-300 flex items-center justify-center font-bold text-xs shadow border border-rose-700/50"
            title="Equip Powerup / Fireball (B)"
          >
            <Flame className="w-5 h-5" />
          </button>

          <button
            id="touch-jump"
            onMouseDown={() => onInputDown('jump')}
            onMouseUp={() => onInputUp('jump')}
            onTouchStart={(e) => { e.preventDefault(); onInputDown('jump'); }}
            onTouchEnd={(e) => { e.preventDefault(); onInputUp('jump'); }}
            className="w-14 h-14 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg border border-amber-300"
            title="Jump / Double Jump (Spacebar)"
          >
            <MoveUp className="w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  );
};
