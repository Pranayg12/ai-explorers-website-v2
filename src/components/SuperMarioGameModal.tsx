import React, { useState, useEffect, useRef } from 'react';
import { GameStats, CharacterId, PowerUpType } from '../types';
import { CHARACTERS } from '../data/characters';
import { ALL_LEVELS } from '../data/levels';
import { HUD } from './HUD';
import { MarioGameCanvas } from './MarioGameCanvas';
import { CharacterShopModal } from './CharacterShopModal';
import { LevelCompleteModal } from './LevelCompleteModal';
import { GameOverModal } from './GameOverModal';
import { VictoryModal } from './VictoryModal';
import { ControlsOverlay } from './ControlsOverlay';
import { audioEngine } from '../services/audio';
import { ArrowLeft, X, Sparkles } from 'lucide-react';

interface SuperMarioGameModalProps {
  onClose: () => void;
}

export const SuperMarioGameModal: React.FC<SuperMarioGameModalProps> = ({ onClose }) => {
  // Global Game Statistics
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    coins: 0,
    lives: 3,
    currentLevel: 1,
    unlockedCharacters: ['mario'],
    greenStarsCollected: 0,
  });

  const [selectedCharacterId, setSelectedCharacterId] = useState<CharacterId>('mario');
  const [powerUp, setPowerUp] = useState<PowerUpType>('none');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sfxMuted, setSfxMuted] = useState<boolean>(false);
  const [bgmMuted, setBgmMuted] = useState<boolean>(false);

  // Modals
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isLevelCompleteOpen, setIsLevelCompleteOpen] = useState<boolean>(false);
  const [flagScore, setFlagScore] = useState<number>(500);
  const [isGameOverOpen, setIsGameOverOpen] = useState<boolean>(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);

  // Stop BGM when exiting or unmounting
  const handleExit = () => {
    audioEngine.stopBgm();
    onClose();
  };

  // Instantaneous Key Inputs Ref for 60fps Canvas Physics Loop
  const inputStateRef = useRef({
    left: false,
    right: false,
    down: false,
    jump: false,
    sprint: false,
    powerup: false,
  });

  // Attach Global Key Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent page scrolling on arrow keys or space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      const key = e.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') inputStateRef.current.left = true;
      if (key === 'arrowright' || key === 'd') inputStateRef.current.right = true;
      if (key === 'arrowdown' || key === 's') inputStateRef.current.down = true;
      if (key === ' ' || key === 'arrowup' || key === 'w') inputStateRef.current.jump = true;
      if (key === 'shift') inputStateRef.current.sprint = true;
      if (key === 'b') inputStateRef.current.powerup = true;

      // Pause Shortcut
      if (key === 'p') {
        setIsPaused((prev) => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') inputStateRef.current.left = false;
      if (key === 'arrowright' || key === 'd') inputStateRef.current.right = false;
      if (key === 'arrowdown' || key === 's') inputStateRef.current.down = false;
      if (key === ' ' || key === 'arrowup' || key === 'w') inputStateRef.current.jump = false;
      if (key === 'shift') inputStateRef.current.sprint = false;
      if (key === 'b') inputStateRef.current.powerup = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      audioEngine.stopBgm();
    };
  }, []);

  // Touch / On-screen inputs
  const handleTouchDown = (action: string) => {
    if (action === 'left') inputStateRef.current.left = true;
    if (action === 'right') inputStateRef.current.right = true;
    if (action === 'down') inputStateRef.current.down = true;
    if (action === 'jump') inputStateRef.current.jump = true;
    if (action === 'sprint') inputStateRef.current.sprint = true;
    if (action === 'powerup') inputStateRef.current.powerup = true;
  };

  const handleTouchUp = (action: string) => {
    if (action === 'left') inputStateRef.current.left = false;
    if (action === 'right') inputStateRef.current.right = false;
    if (action === 'down') inputStateRef.current.down = false;
    if (action === 'jump') inputStateRef.current.jump = false;
    if (action === 'sprint') inputStateRef.current.sprint = false;
    if (action === 'powerup') inputStateRef.current.powerup = false;
  };

  // Audio Toggles
  const handleToggleSfx = () => {
    const muted = audioEngine.toggleSfx();
    setSfxMuted(muted);
  };

  const handleToggleBgm = () => {
    const muted = audioEngine.toggleBgm();
    setBgmMuted(muted);
  };

  // Unlock Character
  const handleUnlockCharacter = (id: CharacterId, cost: number) => {
    setStats((prev) => ({
      ...prev,
      coins: prev.coins - cost,
      unlockedCharacters: [...prev.unlockedCharacters, id],
    }));
    setSelectedCharacterId(id);
  };

  // Level Clear Handler
  const handleLevelComplete = (earnedFlagScore: number) => {
    setFlagScore(earnedFlagScore);
    setIsLevelCompleteOpen(true);
  };

  // Advance to Next Level
  const handleNextLevel = () => {
    setIsLevelCompleteOpen(false);
    setStats((prev) => {
      const nextLvl = prev.currentLevel + 1;
      if (nextLvl > 4) {
        setIsVictoryOpen(true);
        return prev;
      }
      return { ...prev, currentLevel: nextLvl };
    });
  };

  // Game Over Handler
  const handleGameOver = () => {
    setIsGameOverOpen(true);
  };

  // Retry Current Level (+3 Lives)
  const handleRetryLevel = () => {
    setIsGameOverOpen(false);
    setStats((prev) => ({ ...prev, lives: 3 }));
  };

  // Restart Entire Game From Level 1
  const handleRestartGame = () => {
    setIsGameOverOpen(false);
    setIsVictoryOpen(false);
    setStats({
      score: 0,
      coins: 0,
      lives: 3,
      currentLevel: 1,
      unlockedCharacters: stats.unlockedCharacters,
      greenStarsCollected: 0,
    });
    setPowerUp('none');
  };

  const currentLevelConfig = ALL_LEVELS[stats.currentLevel] || ALL_LEVELS[1];
  const currentCharacter = CHARACTERS[selectedCharacterId] || CHARACTERS.mario;

  return (
    <div 
      id="mario-game-modal-root" 
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md text-slate-100 flex flex-col font-sans select-none overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Navigation & Exit Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={handleExit}
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-red-600/30 transition-all hover:-translate-x-0.5 active:translate-x-0 cursor-pointer"
            title="Exit game and return to AI Explorers showcase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Game</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="h-4 w-[1px] bg-slate-700" />
            <span className="text-xs text-slate-400 font-medium">Student Showcase:</span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Super Mario 2D
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden md:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-amber-300">P</kbd> to Pause</span>
          <button
            onClick={handleExit}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            aria-label="Close Game"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Top HUD Header */}
      <HUD
        stats={stats}
        currentLevelName={currentLevelConfig.name}
        currentLevelSubtitle={currentLevelConfig.subtitle}
        difficulty={currentLevelConfig.difficulty}
        powerUp={powerUp}
        currentCharacter={currentCharacter}
        isPaused={isPaused}
        sfxMuted={sfxMuted}
        bgmMuted={bgmMuted}
        onToggleSfx={handleToggleSfx}
        onToggleBgm={handleToggleBgm}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Game Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 relative overflow-hidden">
        <MarioGameCanvas
          stats={stats}
          currentCharacter={currentCharacter}
          isPaused={isPaused}
          onUpdateStats={setStats}
          onLevelComplete={handleLevelComplete}
          onGameOver={handleGameOver}
          onVictory={() => setIsVictoryOpen(true)}
          inputStateRef={inputStateRef}
        />
      </main>

      {/* Character Shop Modal */}
      <CharacterShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        unlockedCharacters={stats.unlockedCharacters}
        selectedCharacterId={selectedCharacterId}
        coins={stats.coins}
        onSelectCharacter={setSelectedCharacterId}
        onUnlockCharacter={handleUnlockCharacter}
      />

      {/* Level Complete Modal */}
      <LevelCompleteModal
        isOpen={isLevelCompleteOpen}
        levelNumber={stats.currentLevel}
        levelName={currentLevelConfig.name}
        flagScore={flagScore}
        totalScore={stats.score}
        coinsCollected={stats.coins}
        onNextLevel={handleNextLevel}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={isGameOverOpen}
        score={stats.score}
        coins={stats.coins}
        onRetryLevel={handleRetryLevel}
        onRestartGame={handleRestartGame}
      />

      {/* Victory Modal */}
      <VictoryModal
        isOpen={isVictoryOpen}
        score={stats.score}
        coins={stats.coins}
        greenStars={stats.greenStarsCollected}
        onRestartGame={handleRestartGame}
      />

      {/* Controls Overlay & On-Screen Touch Buttons */}
      <ControlsOverlay
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onInputDown={handleTouchDown}
        onInputUp={handleTouchUp}
      />
    </div>
  );
};
