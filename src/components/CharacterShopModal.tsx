import React from 'react';
import { CharacterInfo, CharacterId } from '../types';
import { CHARACTERS } from '../data/characters';
import { Coins, Check, Lock, X, Zap } from 'lucide-react';
import { audioEngine } from '../services/audio';

interface CharacterShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedCharacters: CharacterId[];
  selectedCharacterId: CharacterId;
  coins: number;
  onSelectCharacter: (id: CharacterId) => void;
  onUnlockCharacter: (id: CharacterId, cost: number) => void;
}

export const CharacterShopModal: React.FC<CharacterShopModalProps> = ({
  isOpen,
  onClose,
  unlockedCharacters,
  selectedCharacterId,
  coins,
  onSelectCharacter,
  onUnlockCharacter,
}) => {
  if (!isOpen) return null;

  return (
    <div id="character-shop-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-white flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-black text-amber-400 font-mono tracking-tight flex items-center gap-2">
              <span>AVATAR CHARACTER SHOP</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Earn coins in levels to unlock distinct avatars with special jump & speed abilities!
            </p>
          </div>
          <button
            id="btn-close-shop"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coin Balance Bar */}
        <div className="my-4 bg-slate-800/80 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-slate-300">Your Coin Balance:</span>
          </div>
          <span className="text-2xl font-black font-mono text-yellow-300">{coins} Coins</span>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 my-2 flex-1">
          {Object.values(CHARACTERS).map((char: CharacterInfo) => {
            const isUnlocked = unlockedCharacters.includes(char.id);
            const isSelected = selectedCharacterId === char.id;
            const canAfford = coins >= char.unlockCostCoins;

            return (
              <div
                key={char.id}
                className={`relative rounded-xl border p-4 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/40'
                    : isUnlocked
                    ? 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                    : 'bg-slate-900/60 border-slate-800 opacity-80'
                }`}
              >
                {/* Character Card Top */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Character Color Icon Box */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow border border-white/20"
                        style={{ backgroundColor: char.primaryColor }}
                      >
                        <span className="drop-shadow-md text-white font-mono">
                          {char.name[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-100">{char.name}</h3>
                        <p className="text-xs text-amber-300/80 font-medium">{char.title}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full">
                        EQUIPPED
                      </span>
                    )}
                  </div>

                  {/* Description & Perk */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {char.description}
                  </p>

                  {/* Stat Bars */}
                  <div className="mt-3 space-y-1.5 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Speed</span>
                      <span className="text-slate-200 font-bold">{char.speed}</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-sky-400 h-full rounded-full"
                        style={{ width: `${(char.speed / 7.0) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Jump</span>
                      <span className="text-slate-200 font-bold">{char.jumpPower}</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: `${(char.jumpPower / 16.0) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  {isUnlocked ? (
                    <button
                      id={`btn-select-${char.id}`}
                      onClick={() => {
                        onSelectCharacter(char.id);
                        audioEngine.playCoin();
                      }}
                      disabled={isSelected}
                      className={`w-full py-2 px-3 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-default'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-100 active:scale-95'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4 text-amber-400" /> Equipped
                        </>
                      ) : (
                        'Equip Avatar'
                      )}
                    </button>
                  ) : (
                    <button
                      id={`btn-unlock-${char.id}`}
                      onClick={() => {
                        if (canAfford) {
                          onUnlockCharacter(char.id, char.unlockCostCoins);
                          audioEngine.playPowerUpEat();
                        }
                      }}
                      disabled={!canAfford}
                      className={`w-full py-2 px-3 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                        canAfford
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow active:scale-95'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlock ({char.unlockCostCoins} Coins)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            id="btn-done-shop"
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2 rounded-xl text-sm transition active:scale-95 shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
