import React from 'react';
import { PowerUpType, GameStats, CharacterInfo } from '../types';
import { Volume2, VolumeX, Music, HelpCircle, Pause, Play, ShoppingBag, Heart, Coins, Trophy } from 'lucide-react';
import { audioEngine } from '../services/audio';

interface HUDProps {
  stats: GameStats;
  currentLevelName: string;
  currentLevelSubtitle: string;
  difficulty: string;
  powerUp: PowerUpType;
  currentCharacter: CharacterInfo;
  isPaused: boolean;
  sfxMuted: boolean;
  bgmMuted: boolean;
  onToggleSfx: () => void;
  onToggleBgm: () => void;
  onTogglePause: () => void;
  onOpenShop: () => void;
  onOpenHelp: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  currentLevelName,
  currentLevelSubtitle,
  difficulty,
  powerUp,
  currentCharacter,
  isPaused,
  sfxMuted,
  bgmMuted,
  onToggleSfx,
  onToggleBgm,
  onTogglePause,
  onOpenShop,
  onOpenHelp,
}) => {
  const getDifficultyBadge = () => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Hard':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Near Impossible':
        return 'bg-purple-600/30 text-purple-300 border-purple-500/50 animate-pulse';
      case 'Bonus':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <header id="game-hud" className="w-full bg-slate-900/90 backdrop-blur border-b border-slate-700/60 px-4 py-2.5 text-white flex flex-wrap items-center justify-between gap-3 select-none">
      {/* Left: Brand & Level Info */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-amber-400 tracking-wide font-mono">
              MARIO 2D
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${getDifficultyBadge()}`}>
              {difficulty}
            </span>
          </div>
          <span className="text-xs text-slate-300 font-medium truncate max-w-[200px] sm:max-w-xs">
            {currentLevelName} — <span className="text-slate-400">{currentLevelSubtitle}</span>
          </span>
        </div>
      </div>

      {/* Center: Core Stats (Lives, Coins, Score, PowerUp) */}
      <div className="flex items-center gap-4 sm:gap-6 bg-slate-800/80 px-4 py-1.5 rounded-xl border border-slate-700/50 shadow-inner">
        {/* Lives */}
        <div className="flex items-center gap-1.5" title="Lives Remaining">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
          <span className="font-bold font-mono text-base text-rose-200">x{stats.lives}</span>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-1.5" title="Gold Coins">
          <Coins className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold font-mono text-base text-yellow-300">{stats.coins}</span>
        </div>

        {/* Green Stars */}
        {stats.greenStarsCollected > 0 && (
          <div className="flex items-center gap-1.5" title="Green Stars Collected">
            <span className="text-emerald-400 font-bold text-lg">★</span>
            <span className="font-bold font-mono text-base text-emerald-300">x{stats.greenStarsCollected}</span>
          </div>
        )}

        {/* Score */}
        <div className="flex items-center gap-1.5" title="Total Score">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="font-bold font-mono text-base text-amber-200">{stats.score.toString().padStart(6, '0')}</span>
        </div>

        {/* Powerup Badge */}
        {powerUp !== 'none' && (
          <div className="hidden sm:flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">
            {powerUp === 'mushroom' && '🍄 Super'}
            {powerUp === 'flower' && '🔥 Fire (B Key)'}
            {powerUp === 'star' && '⭐ Star Man'}
          </div>
        )}
      </div>

      {/* Right Controls: Character Shop, Audio, Help, Pause */}
      <div className="flex items-center gap-2">
        {/* Character Avatar Button */}
        <button
          id="btn-character-shop"
          onClick={onOpenShop}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 px-3 py-1.5 rounded-lg text-xs font-bold shadow transition-all active:scale-95 border border-red-400/40"
          title="Change Character Avatar"
        >
          <ShoppingBag className="w-4 h-4 text-yellow-200" />
          <span>{currentCharacter.name}</span>
        </button>

        {/* Audio Toggles */}
        <button
          id="btn-toggle-sfx"
          onClick={onToggleSfx}
          className={`p-1.5 rounded-lg border transition-all ${
            sfxMuted
              ? 'bg-rose-950/60 border-rose-800/80 text-rose-400'
              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
          }`}
          title={sfxMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {sfxMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          id="btn-toggle-bgm"
          onClick={onToggleBgm}
          className={`p-1.5 rounded-lg border transition-all ${
            bgmMuted
              ? 'bg-rose-950/60 border-rose-800/80 text-rose-400'
              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
          }`}
          title={bgmMuted ? 'Unmute Background Music' : 'Mute Background Music'}
        >
          <Music className={`w-4 h-4 ${!bgmMuted ? 'text-amber-400' : ''}`} />
        </button>

        {/* Controls Help */}
        <button
          id="btn-open-help"
          onClick={onOpenHelp}
          className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all"
          title="Game Controls & Instructions"
        >
          <HelpCircle className="w-4 h-4 text-sky-400" />
        </button>

        {/* Pause Toggle */}
        <button
          id="btn-toggle-pause"
          onClick={onTogglePause}
          className="p-1.5 rounded-lg bg-amber-600/30 border border-amber-500/50 text-amber-300 hover:bg-amber-600/50 transition-all font-bold text-xs flex items-center gap-1"
          title={isPaused ? 'Resume Game' : 'Pause Game'}
        >
          {isPaused ? <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Pause className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
