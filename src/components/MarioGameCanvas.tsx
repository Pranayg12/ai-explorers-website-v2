import React, { useEffect, useRef, useState } from 'react';
import {
  LevelConfig,
  PlayerState,
  GameStats,
  Block,
  Coin,
  Goomba,
  Pipe,
  Fireball,
  Particle,
  PowerUpType,
  CharacterInfo,
} from '../types';
import { ALL_LEVELS } from '../data/levels';
import { CHARACTERS } from '../data/characters';
import { audioEngine } from '../services/audio';

interface MarioGameCanvasProps {
  stats: GameStats;
  currentCharacter: CharacterInfo;
  isPaused: boolean;
  onUpdateStats: (updater: (prev: GameStats) => GameStats) => void;
  onLevelComplete: (flagScore: number) => void;
  onGameOver: () => void;
  onVictory: () => void;
  inputStateRef: React.MutableRefObject<{
    left: boolean;
    right: boolean;
    down: boolean;
    jump: boolean;
    sprint: boolean;
    powerup: boolean;
  }>;
}

export const MarioGameCanvas: React.FC<MarioGameCanvasProps> = ({
  stats,
  currentCharacter,
  isPaused,
  onUpdateStats,
  onLevelComplete,
  onGameOver,
  onVictory,
  inputStateRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active level state (cloned from config so edits like collected coins, hit blocks, killed goombas persist in session)
  const [level, setLevel] = useState<LevelConfig>(() => JSON.parse(JSON.stringify(ALL_LEVELS[stats.currentLevel] || ALL_LEVELS[1])));

  // Internal game state refs to avoid React re-render lags in 60fps loop
  const levelRef = useRef<LevelConfig>(level);
  levelRef.current = level;

  const playerRef = useRef<PlayerState>({
    x: level.spawnPoint.x,
    y: level.spawnPoint.y,
    width: 32,
    height: 40,
    vx: 0,
    vy: 0,
    isGrounded: false,
    facingLeft: false,
    characterId: currentCharacter.id,
    powerUp: 'none',
    invincibleTimer: 0,
    starInvincibleTimer: 0,
    jumpCount: 0,
    maxJumps: 2,
    isFloating: false,
    isSprinting: false,
    isCrouching: false,
  });

  const fireballsRef = useRef<Fireball[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const cameraXRef = useRef<number>(0);
  const lastJumpTimeRef = useRef<number>(0);
  const wasJumpPressedRef = useRef<boolean>(false);
  const wasPowerupPressedRef = useRef<boolean>(false);

  // Store modified level states so level progress is preserved across warps
  const savedLevelStatesRef = useRef<Record<number, LevelConfig>>({});
  // Store return location after exiting a warp area
  const warpReturnPosRef = useRef<{ levelId: number; x: number; y: number } | null>(null);

  // Handle entering a warp pipe
  const handleEnterWarpPipe = (pipe: Pipe) => {
    audioEngine.playPipe();
    const currentLvlId = levelRef.current.id;

    // Save modified state of current level so coins, blocks hit, goombas defeated are preserved
    savedLevelStatesRef.current[currentLvlId] = JSON.parse(JSON.stringify(levelRef.current));

    if (pipe.targetLevel === 'bonus') {
      // Record return position in current level (right beside this warp pipe)
      warpReturnPosRef.current = {
        levelId: currentLvlId,
        x: pipe.x + pipe.width + 16,
        y: pipe.y - 40,
      };
      // Teleport to Bonus Level (5)
      onUpdateStats((prev) => ({ ...prev, currentLevel: 5 }));
    } else if (pipe.targetLevel === 'return') {
      // Return from Bonus Level back to origin main level
      const returnLvl = warpReturnPosRef.current?.levelId ?? 1;
      onUpdateStats((prev) => ({ ...prev, currentLevel: returnLvl }));
    } else if (typeof pipe.targetLevel === 'number') {
      const targetLvl = pipe.targetLevel;
      const targetX = pipe.targetX ?? (pipe.x + pipe.width + 16);
      const targetY = pipe.targetY ?? (pipe.y - 40);

      warpReturnPosRef.current = {
        levelId: targetLvl,
        x: targetX,
        y: targetY,
      };

      if (currentLvlId === targetLvl) {
        // Teleport inside the same level (e.g. World 4 secret tunnel to Boss Floor)
        const p = playerRef.current;
        p.x = targetX;
        p.y = targetY;
        p.vx = 0;
        p.vy = 0;
        cameraXRef.current = Math.max(0, targetX - 200);
        warpReturnPosRef.current = null;
      } else {
        onUpdateStats((prev) => ({ ...prev, currentLevel: targetLvl }));
      }
    }
  };

  // Sync level on level change
  useEffect(() => {
    const lvlId = stats.currentLevel;
    let activeLevel: LevelConfig;

    if (savedLevelStatesRef.current[lvlId]) {
      activeLevel = savedLevelStatesRef.current[lvlId];
    } else {
      activeLevel = JSON.parse(JSON.stringify(ALL_LEVELS[lvlId] || ALL_LEVELS[1]));
    }

    setLevel(activeLevel);
    levelRef.current = activeLevel;

    // Determine spawn location
    let spawnX = activeLevel.spawnPoint.x;
    let spawnY = activeLevel.spawnPoint.y;

    if (warpReturnPosRef.current && warpReturnPosRef.current.levelId === lvlId) {
      spawnX = warpReturnPosRef.current.x;
      spawnY = warpReturnPosRef.current.y;
      warpReturnPosRef.current = null;
    }

    playerRef.current = {
      x: spawnX,
      y: spawnY,
      width: 32,
      height: 40,
      vx: 0,
      vy: 0,
      isGrounded: false,
      facingLeft: false,
      characterId: currentCharacter.id,
      powerUp: 'none',
      invincibleTimer: 0,
      starInvincibleTimer: 0,
      jumpCount: 0,
      maxJumps: 2,
      isFloating: false,
      isSprinting: false,
      isCrouching: false,
    };
    fireballsRef.current = [];
    particlesRef.current = [];
    cameraXRef.current = Math.max(0, spawnX - 200);

    // Start appropriate background music
    audioEngine.playBgm(activeLevel.theme);
  }, [stats.currentLevel, currentCharacter.id]);

  // Adjust player size according to powerup
  useEffect(() => {
    const p = playerRef.current;
    if (p.powerUp === 'mushroom' || p.powerUp === 'flower') {
      p.height = 54;
    } else {
      p.height = 40;
    }
  }, [playerRef.current.powerUp]);

  // Handle Canvas Clicking (specifically clicking Axe Switch or Bowser)
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left + cameraXRef.current;
    const clickY = e.clientY - rect.top;

    const currentLvl = levelRef.current;
    if (currentLvl.bridgeSwitch && !currentLvl.bridgeSwitch.pressed) {
      const sw = currentLvl.bridgeSwitch;
      if (
        clickX >= sw.x - 40 &&
        clickX <= sw.x + sw.width + 40 &&
        clickY >= sw.y - 40 &&
        clickY <= sw.y + sw.height + 40
      ) {
        // Press Axe Switch!
        sw.pressed = true;
        audioEngine.playBlockBreak();
        audioEngine.playBowserRoar();
        setLevel({ ...currentLvl });
      }
    }
  };

  // MAIN 60FPS GAME LOOP
  useEffect(() => {
    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      if (!isPaused) {
        updatePhysics();
      }
      renderCanvas(ctx);
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, currentCharacter]);

  // PHYSICS UPDATE ENGINE
  const updatePhysics = () => {
    const lvl = levelRef.current;
    const p = playerRef.current;
    const inputs = inputStateRef.current;

    // Update timers
    if (p.invincibleTimer > 0) p.invincibleTimer--;
    if (p.starInvincibleTimer > 0) p.starInvincibleTimer--;

    // Horizontal Controls (Left Arrow / Right Arrow)
    let moveSpeed = currentCharacter.speed;
    p.isSprinting = inputs.sprint;
    if (inputs.sprint) {
      moveSpeed *= 1.5;
    }

    if (inputs.left) {
      p.vx = -moveSpeed;
      p.facingLeft = true;
    } else if (inputs.right) {
      p.vx = moveSpeed;
      p.facingLeft = false;
    } else {
      p.vx *= 0.78; // Friction
      if (Math.abs(p.vx) < 0.1) p.vx = 0;
    }

    // Jump Logic & Double Jump
    if (inputs.jump && !wasJumpPressedRef.current) {
      const now = Date.now();
      if (p.isGrounded) {
        // First Jump
        p.vy = -currentCharacter.jumpPower;
        p.isGrounded = false;
        p.jumpCount = 1;
        audioEngine.playJump();
        spawnParticles(p.x + p.width / 2, p.y + p.height, '#e2e8f0', 5);
      } else if (p.jumpCount < p.maxJumps) {
        // Double Jump!
        p.vy = -currentCharacter.jumpPower * 0.92;
        p.jumpCount++;
        audioEngine.playDoubleJump();
        // Double jump ring burst
        spawnParticles(p.x + p.width / 2, p.y + p.height, '#f59e0b', 10);
      }
      lastJumpTimeRef.current = now;
    }
    wasJumpPressedRef.current = inputs.jump;

    // Princess Peach / Yoshi Float Ability
    if (currentCharacter.floatAbility && !p.isGrounded && inputs.jump && p.vy > 0) {
      p.vy *= 0.68; // Float gliding effect
      spawnParticles(p.x + p.width / 2, p.y + p.height, '#f472b6', 1);
    }

    // Powerup / Fireball Activation (Press B Key or Button)
    if (inputs.powerup && !wasPowerupPressedRef.current) {
      if (p.powerUp === 'flower') {
        // Shoot Fireball
        audioEngine.playFireball();
        fireballsRef.current.push({
          id: `fb-${Date.now()}`,
          x: p.facingLeft ? p.x - 10 : p.x + p.width + 2,
          y: p.y + p.height / 2 - 8,
          width: 16,
          height: 16,
          vx: p.facingLeft ? -8 : 8,
          vy: 2,
          fromPlayer: true,
          active: true,
          bounces: 0,
        });
      } else if (p.powerUp === 'mushroom') {
        // Equip/Activate Super Aura
        audioEngine.playPowerUpEat();
        spawnParticles(p.x + p.width / 2, p.y + p.height / 2, '#ef4444', 15);
      }
    }
    wasPowerupPressedRef.current = inputs.powerup;

    // -------------------------------------------------------------
    // PASS 1: HORIZONTAL MOVEMENT & COLLISIONS
    // -------------------------------------------------------------
    p.x += p.vx;

    // Clamp inside level left border
    if (p.x < 0) p.x = 0;

    // Horizontal Block Collisions (Bricks, Lucky, Stone Staircase Steps)
    lvl.blocks.forEach((b: Block) => {
      if (
        p.x + p.width > b.x &&
        p.x < b.x + b.width &&
        p.y + p.height > b.y + 4 && // small threshold to avoid sticking on top edge
        p.y < b.y + b.height - 4
      ) {
        const overlapLeft = p.x + p.width - b.x;
        const overlapRight = b.x + b.width - p.x;

        if (overlapLeft < overlapRight && p.vx >= 0) {
          p.x = b.x - p.width;
          p.vx = 0;
        } else if (overlapRight < overlapLeft && p.vx <= 0) {
          p.x = b.x + b.width;
          p.vx = 0;
        }
      }
    });

    // Horizontal Pipe Collisions (Prevents passing through or under pipes)
    lvl.pipes.forEach((pipe: Pipe) => {
      if (
        p.x + p.width > pipe.x &&
        p.x < pipe.x + pipe.width &&
        p.y + p.height > pipe.y + 4 &&
        p.y < pipe.y + pipe.height - 4
      ) {
        const overlapLeft = p.x + p.width - pipe.x;
        const overlapRight = pipe.x + pipe.width - p.x;

        if (overlapLeft < overlapRight && p.vx >= 0) {
          p.x = pipe.x - p.width;
          p.vx = 0;
        } else if (overlapRight < overlapLeft && p.vx <= 0) {
          p.x = pipe.x + pipe.width;
          p.vx = 0;
        }
      }
    });

    // -------------------------------------------------------------
    // PASS 2: VERTICAL MOVEMENT, GRAVITY & COLLISIONS
    // -------------------------------------------------------------
    p.vy += lvl.gravity;
    if (p.vy > 14) p.vy = 14;

    p.y += p.vy;
    p.isGrounded = false;

    // Ground Floor & Platform Collision
    const groundY = lvl.height - 80;

    // Default ground floor unless over a gap
    let isOverGap = false;
    if (lvl.id === 1) {
      if ((p.x >= 1200 && p.x <= 1300) || (p.x >= 2100 && p.x <= 2220)) isOverGap = true;
    } else if (lvl.id === 2) {
      if ((p.x >= 750 && p.x <= 1320) || (p.x >= 1850 && p.x <= 2550)) isOverGap = true;
    } else if (lvl.id === 3) {
      if ((p.x >= 650 && p.x <= 1180) || (p.x >= 1750 && p.x <= 2500)) isOverGap = true;
    } else if (lvl.id === 4) {
      if (p.x >= 500 && p.x <= 1350) isOverGap = true;
      if (p.x >= 1750 && p.x <= 2150) isOverGap = true;
      // Bowser Drawbridge area: gap under bridge unless bridge tiles exist
      if (p.x >= 2250 && p.x <= 2750) {
        if (!lvl.bridgeSwitch || lvl.bridgeSwitch.pressed) {
          isOverGap = true; // Bridge fell!
        }
      }
    }

    if (!isOverGap && p.y + p.height >= groundY) {
      p.y = groundY - p.height;
      p.vy = 0;
      p.isGrounded = true;
      p.jumpCount = 0;
    }

    // Vertical Block Collisions
    lvl.blocks.forEach((b: Block) => {
      if (
        p.x + p.width > b.x &&
        p.x < b.x + b.width &&
        p.y + p.height > b.y &&
        p.y < b.y + b.height
      ) {
        const overlapTop = p.y + p.height - b.y;
        const overlapBottom = b.y + b.height - p.y;

        if (overlapTop <= overlapBottom && p.vy >= 0) {
          // Standing / landing on top of block
          p.y = b.y - p.height;
          p.vy = 0;
          p.isGrounded = true;
          p.jumpCount = 0;
        } else if (overlapBottom < overlapTop && p.vy < 0) {
          // Hitting block from below
          p.y = b.y + b.height;
          p.vy = 1;
          handleBlockHit(b);
        }
      }
    });

    // Vertical Pipe Collisions & Warp Logic
    lvl.pipes.forEach((pipe: Pipe) => {
      if (
        p.x + p.width > pipe.x &&
        p.x < pipe.x + pipe.width &&
        p.y + p.height > pipe.y &&
        p.y < pipe.y + pipe.height
      ) {
        const overlapTop = p.y + p.height - pipe.y;
        const overlapBottom = pipe.y + pipe.height - p.y;

        if (overlapTop <= overlapBottom && p.vy >= 0) {
          // Standing on top of pipe
          p.y = pipe.y - p.height;
          p.vy = 0;
          p.isGrounded = true;
          p.jumpCount = 0;

          // Press Down / S to enter warp pipe!
          if (inputs.down && pipe.isWarpPipe) {
            handleEnterWarpPipe(pipe);
          }
        } else if (overlapBottom < overlapTop && p.vy < 0) {
          // Hitting pipe from bottom (cannot go under or inside pipe)
          p.y = pipe.y + pipe.height;
          p.vy = 1;
        }
      }
    });

    // Check Axe / Switch Button Collision (Level 4)
    if (lvl.bridgeSwitch && !lvl.bridgeSwitch.pressed) {
      const sw = lvl.bridgeSwitch;
      if (
        p.x + p.width > sw.x &&
        p.x < sw.x + sw.width &&
        p.y + p.height > sw.y &&
        p.y < sw.y + sw.height
      ) {
        sw.pressed = true;
        audioEngine.playBlockBreak();
        audioEngine.playBowserRoar();
      }
    }

    // Bridge Collapse Logic (Level 4)
    if (lvl.bridgeSwitch && lvl.bridgeSwitch.pressed && lvl.bowser && lvl.bowser.alive) {
      lvl.bowser.fallingInLava = true;
      lvl.bowser.y += 4;
      if (lvl.bowser.y >= lvl.bowser.lavaY) {
        lvl.bowser.alive = false;
        audioEngine.playLavaSplash();
        if (lvl.peachCage) lvl.peachCage.saved = true;
        // Trigger Victory!
        setTimeout(() => {
          onVictory();
        }, 1200);
      }
    }

    // Bowser Attacks (Level 4)
    if (lvl.bowser && lvl.bowser.alive && !lvl.bowser.fallingInLava) {
      lvl.bowser.attackTimer++;
      if (lvl.bowser.attackTimer % 120 === 0) {
        // Fireball attack from Bowser
        audioEngine.playBowserRoar();
        fireballsRef.current.push({
          id: `bowser-fb-${Date.now()}`,
          x: lvl.bowser.x - 20,
          y: lvl.bowser.y + 20,
          width: 24,
          height: 24,
          vx: -5.5,
          vy: Math.sin(lvl.bowser.attackTimer) * 2,
          fromPlayer: false,
          active: true,
          bounces: 0,
        });
      }
    }

    // Collect Coins
    lvl.coins.forEach((c: Coin) => {
      if (!c.collected) {
        if (
          p.x + p.width > c.x &&
          p.x < c.x + c.width &&
          p.y + p.height > c.y &&
          p.y < c.y + c.height
        ) {
          c.collected = true;
          if (c.isGreenStar) {
            audioEngine.playGreenStar();
            onUpdateStats((prev) => ({
              ...prev,
              score: prev.score + 1000,
              greenStarsCollected: prev.greenStarsCollected + 1,
            }));
            spawnParticles(c.x, c.y, '#10b981', 15, '+1000 GREEN STAR!');
          } else {
            audioEngine.playCoin();
            onUpdateStats((prev) => ({
              ...prev,
              coins: prev.coins + 1,
              score: prev.score + 100,
            }));
            spawnParticles(c.x, c.y, '#f59e0b', 6, '+100');
          }
        }
      }
    });

    // Goomba Physics & Collision
    lvl.goombas.forEach((g: Goomba) => {
      if (g.alive && !g.squished) {
        g.x += g.vx;

        // Turn around at gap boundaries
        if (g.x < 100 || g.x > lvl.width - 200) {
          g.vx *= -1;
        }

        // Bounce off pipes
        lvl.pipes.forEach((pipe: Pipe) => {
          if (
            g.x + g.width > pipe.x &&
            g.x < pipe.x + pipe.width &&
            g.y + g.height > pipe.y &&
            g.y < pipe.y + pipe.height
          ) {
            g.vx *= -1;
            g.x += g.vx * 2;
          }
        });

        // Bounce off blocks / staircase steps
        lvl.blocks.forEach((b: Block) => {
          if (
            g.x + g.width > b.x &&
            g.x < b.x + b.width &&
            g.y + g.height > b.y + 4 &&
            g.y < b.y + b.height - 4
          ) {
            g.vx *= -1;
            g.x += g.vx * 2;
          }
        });

        // Collision with Player
        if (
          p.x + p.width > g.x &&
          p.x < g.x + g.width &&
          p.y + p.height > g.y &&
          p.y < g.y + g.height
        ) {
          // Stomped on top
          if (p.vy > 0 && p.y + p.height - p.vy <= g.y + 12) {
            g.squished = true;
            g.squishTimer = 30;
            p.vy = -8; // Bounce off enemy
            audioEngine.playStomp();
            onUpdateStats((prev) => ({ ...prev, score: prev.score + 200 }));
            spawnParticles(g.x + g.width / 2, g.y, '#b45309', 8, '+200');
          } else if (p.starInvincibleTimer > 0) {
            // Star invincibility defeats Goomba on contact
            g.alive = false;
            audioEngine.playStomp();
            onUpdateStats((prev) => ({ ...prev, score: prev.score + 200 }));
            spawnParticles(g.x + g.width / 2, g.y, '#f59e0b', 10, '+200');
          } else if (p.invincibleTimer === 0) {
            // Player takes damage
            handlePlayerDamage();
          }
        }
      } else if (g.squished) {
        g.squishTimer--;
        if (g.squishTimer <= 0) {
          g.alive = false;
        }
      }
    });

    // Fireball Mechanics
    fireballsRef.current.forEach((fb: Fireball) => {
      if (fb.active) {
        fb.x += fb.vx;
        fb.y += fb.vy;
        fb.vy += 0.3; // Gravity on fireball

        // Bounce on ground
        if (fb.y >= groundY - fb.height) {
          fb.y = groundY - fb.height;
          fb.vy = -4.5;
          fb.bounces++;
          if (fb.bounces > 4) fb.active = false;
        }

        // Player Fireballs hit Goombas / Bowser
        if (fb.fromPlayer) {
          lvl.goombas.forEach((g: Goomba) => {
            if (
              g.alive &&
              !g.squished &&
              fb.x + fb.width > g.x &&
              fb.x < g.x + g.width &&
              fb.y + fb.height > g.y &&
              fb.y < g.y + g.height
            ) {
              g.alive = false;
              fb.active = false;
              audioEngine.playStomp();
              onUpdateStats((prev) => ({ ...prev, score: prev.score + 250 }));
              spawnParticles(g.x + g.width / 2, g.y, '#ef4444', 8, '+250');
            }
          });

          // Hit Bowser
          if (
            lvl.bowser &&
            lvl.bowser.alive &&
            fb.x + fb.width > lvl.bowser.x &&
            fb.x < lvl.bowser.x + lvl.bowser.width &&
            fb.y + fb.height > lvl.bowser.y &&
            fb.y < lvl.bowser.y + lvl.bowser.height
          ) {
            fb.active = false;
            lvl.bowser.health--;
            audioEngine.playBlockHit();
            spawnParticles(lvl.bowser.x + 40, lvl.bowser.y + 40, '#f97316', 12, 'HIT!');
            if (lvl.bowser.health <= 0) {
              if (lvl.bridgeSwitch) lvl.bridgeSwitch.pressed = true;
            }
          }
        } else {
          // Enemy Fireball hits Player
          if (
            p.invincibleTimer === 0 &&
            fb.x + fb.width > p.x &&
            fb.x < p.x + p.width &&
            fb.y + fb.height > p.y &&
            fb.y < p.y + p.height
          ) {
            fb.active = false;
            handlePlayerDamage();
          }
        }
      }
    });

    // Flagpole Reached (Levels 1, 2, 3)
    if (lvl.flagpole && !lvl.flagpole.reached) {
      const flag = lvl.flagpole;
      if (p.x + p.width >= flag.x && p.x <= flag.x + 30) {
        flag.reached = true;
        audioEngine.playFlagpole();

        // Calculate score based on contact height
        const heightContact = Math.max(0, flag.y + flag.height - p.y);
        const contactRatio = heightContact / flag.height;
        let bonusScore = 500;
        if (contactRatio >= 0.8) bonusScore = 5000;
        else if (contactRatio >= 0.5) bonusScore = 2000;

        onUpdateStats((prev) => ({ ...prev, score: prev.score + bonusScore }));
        spawnParticles(flag.x, p.y, '#f59e0b', 20, `+${bonusScore} FLAG!`);

        setTimeout(() => {
          onLevelComplete(bonusScore);
        }, 1800);
      }
    }

    // Check Pitfall Death
    if (p.y > lvl.height + 50) {
      handlePlayerDeath();
    }

    // Update Particles
    particlesRef.current.forEach((part: Particle) => {
      part.x += part.vx;
      part.y += part.vy;
      part.life--;
    });
    particlesRef.current = particlesRef.current.filter((part) => part.life > 0);

    // Update Camera Smooth Scrolling
    const targetCamX = p.x - 250;
    cameraXRef.current += (targetCamX - cameraXRef.current) * 0.1;
    if (cameraXRef.current < 0) cameraXRef.current = 0;
    if (cameraXRef.current > lvl.width - 800) cameraXRef.current = lvl.width - 800;
  };

  // Block Hit Action
  const handleBlockHit = (b: Block) => {
    b.bounceOffsetY = -10;
    setTimeout(() => {
      b.bounceOffsetY = 0;
    }, 120);

    if (b.type === 'lucky' && b.contains) {
      audioEngine.playPowerUpSpawn();
      const p = playerRef.current;

      if (b.contains === 'coin') {
        audioEngine.playCoin();
        onUpdateStats((prev) => ({ ...prev, coins: prev.coins + 1, score: prev.score + 100 }));
        spawnParticles(b.x + 16, b.y - 20, '#f59e0b', 8, '+100 COIN!');
      } else if (b.contains === 'mushroom') {
        p.powerUp = 'mushroom';
        audioEngine.playPowerUpEat();
        onUpdateStats((prev) => ({ ...prev, score: prev.score + 500 }));
        spawnParticles(b.x + 16, b.y - 20, '#ef4444', 12, '🍄 SUPER!');
      } else if (b.contains === 'flower') {
        p.powerUp = 'flower';
        audioEngine.playPowerUpEat();
        onUpdateStats((prev) => ({ ...prev, score: prev.score + 1000 }));
        spawnParticles(b.x + 16, b.y - 20, '#f97316', 15, '🔥 FIRE FLOWER!');
      } else if (b.contains === 'star') {
        p.powerUp = 'star';
        p.starInvincibleTimer = 360; // 6 seconds invincibility
        audioEngine.playPowerUpEat();
        onUpdateStats((prev) => ({ ...prev, score: prev.score + 1000 }));
        spawnParticles(b.x + 16, b.y - 20, '#f59e0b', 20, '⭐ STAR POWER!');
      } else if (b.contains === 'green_star') {
        audioEngine.playGreenStar();
        onUpdateStats((prev) => ({
          ...prev,
          score: prev.score + 1000,
          greenStarsCollected: prev.greenStarsCollected + 1,
        }));
        spawnParticles(b.x + 16, b.y - 20, '#10b981', 20, '★ GREEN STAR!');
      }

      b.type = 'empty';
      b.contains = undefined;
    } else if (b.type === 'brick') {
      audioEngine.playBlockBreak();
      spawnParticles(b.x + 16, b.y + 16, '#b45309', 10);
      onUpdateStats((prev) => ({ ...prev, score: prev.score + 50 }));
    } else {
      audioEngine.playBlockHit();
    }
  };

  // Player Damage & Life Loss
  const handlePlayerDamage = () => {
    const p = playerRef.current;
    if (p.powerUp !== 'none') {
      p.powerUp = 'none';
      p.invincibleTimer = 90; // Invincibility grace period
      audioEngine.playBlockHit();
      spawnParticles(p.x + p.width / 2, p.y + p.height / 2, '#ef4444', 10);
    } else {
      handlePlayerDeath();
    }
  };

  const handlePlayerDeath = () => {
    audioEngine.playGameOver();
    onUpdateStats((prev) => {
      const nextLives = prev.lives - 1;
      if (nextLives <= 0) {
        onGameOver();
      }
      return { ...prev, lives: Math.max(0, nextLives) };
    });

    // Respawn Player
    const lvl = levelRef.current;
    playerRef.current.x = lvl.spawnPoint.x;
    playerRef.current.y = lvl.spawnPoint.y;
    playerRef.current.vx = 0;
    playerRef.current.vy = 0;
    playerRef.current.invincibleTimer = 120;
  };

  // Helper particle spawner
  const spawnParticles = (x: number, y: number, color: string, count: number, text?: string) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        color,
        size: Math.random() * 5 + 3,
        life: 30,
        maxLife: 30,
        text: i === 0 ? text : undefined,
      });
    }
  };

  // CANVAS RENDERING
  const renderCanvas = (ctx: CanvasRenderingContext2D) => {
    const lvl = levelRef.current;
    const p = playerRef.current;
    const camX = cameraXRef.current;

    ctx.clearRect(0, 0, 800, 600);
    ctx.save();
    ctx.translate(-camX, 0);

    // 1. Draw Environment Background based on Theme
    drawLevelBackground(ctx, lvl, camX);

    // 2. Draw Green Warp Pipes
    lvl.pipes.forEach((pipe: Pipe) => {
      drawPipe(ctx, pipe);
    });

    // 3. Draw Blocks (Bricks, Lucky, Stone, Empty)
    lvl.blocks.forEach((b: Block) => {
      drawBlock(ctx, b);
    });

    // 4. Draw Bridge & Switch Button (Level 4)
    if (lvl.bridgeTiles && (!lvl.bridgeSwitch || !lvl.bridgeSwitch.pressed)) {
      lvl.bridgeTiles.forEach((tile) => {
        ctx.fillStyle = '#8f3d19';
        ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
        ctx.strokeStyle = '#4a1b07';
        ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
      });
    }

    if (lvl.bridgeSwitch && !lvl.bridgeSwitch.pressed) {
      const sw = lvl.bridgeSwitch;
      // Glowing Red Axe Switch
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(sw.x, sw.y, sw.width, sw.height);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('🪓', sw.x + 8, sw.y + 24);
    }

    // 5. Draw Peach Cage (Level 4)
    if (lvl.peachCage) {
      const cage = lvl.peachCage;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.strokeRect(cage.x, cage.y, cage.width, cage.height);

      // Peach Sprite inside cage
      ctx.fillStyle = '#ff69b4'; // Pink dress
      ctx.fillRect(cage.x + 15, cage.y + 30, 30, 35);
      ctx.fillStyle = '#fde047'; // Crown / hair
      ctx.fillRect(cage.x + 20, cage.y + 15, 20, 15);

      if (!cage.saved) {
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText('HELP!', cage.x + 12, cage.y - 8);
      } else {
        ctx.fillStyle = '#f472b6';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('❤️ SAVED!', cage.x + 5, cage.y - 12);
      }
    }

    // 6. Draw Bowser Boss (Level 4)
    if (lvl.bowser && lvl.bowser.alive) {
      drawBowser(ctx, lvl.bowser);
    }

    // 7. Draw Flagpole (Levels 1, 2, 3)
    if (lvl.flagpole) {
      drawFlagpole(ctx, lvl.flagpole);
    }

    // 8. Draw Coins
    lvl.coins.forEach((c: Coin) => {
      if (!c.collected) {
        if (c.isGreenStar) {
          // Green Star Item
          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 32px sans-serif';
          ctx.fillText('★', c.x, c.y + 28);
        } else {
          // Spinning Gold Coin
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.ellipse(c.x + 10, c.y + 10, 8, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#fef08a';
          ctx.stroke();
        }
      }
    });

    // 9. Draw Goombas
    lvl.goombas.forEach((g: Goomba) => {
      if (g.alive) {
        drawGoomba(ctx, g);
      }
    });

    // 10. Draw Fireballs
    fireballsRef.current.forEach((fb: Fireball) => {
      if (fb.active) {
        ctx.fillStyle = fb.fromPlayer ? '#f97316' : '#ef4444';
        ctx.beginPath();
        ctx.arc(fb.x + fb.width / 2, fb.y + fb.height / 2, fb.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(fb.x + fb.width / 2, fb.y + fb.height / 2, fb.width / 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 11. Draw Player Character
    drawPlayer(ctx, p, currentCharacter);

    // 12. Draw Particles & Floating Scores
    particlesRef.current.forEach((part: Particle) => {
      ctx.fillStyle = part.color;
      ctx.beginPath();
      ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
      ctx.fill();

      if (part.text) {
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = part.color;
        ctx.fillText(part.text, part.x - 15, part.y - 10);
      }
    });

    ctx.restore();
  };

  // BACKGROUND DRAWING PROCEDURAL GRAPHICS
  const drawLevelBackground = (ctx: CanvasRenderingContext2D, lvl: LevelConfig, camX: number) => {
    if (lvl.theme === 'rolling_hills') {
      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 600);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(camX, 0, 800, 600);

      // Clouds
      ctx.fillStyle = '#ffffff';
      [200, 600, 1100, 1700, 2200, 2800].forEach((cx) => {
        ctx.beginPath();
        ctx.arc(cx, 100, 30, 0, Math.PI * 2);
        ctx.arc(cx + 25, 90, 35, 0, Math.PI * 2);
        ctx.arc(cx + 50, 100, 30, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rolling Hills in distance
      ctx.fillStyle = '#4ade80';
      [100, 700, 1400, 2100, 2700].forEach((hx) => {
        ctx.beginPath();
        ctx.arc(hx, 520, 180, Math.PI, 0);
        ctx.fill();
      });

      // Green Grass Floor
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(camX, 520, 800, 80);
      ctx.fillStyle = '#15803d';
      ctx.fillRect(camX, 520, 800, 10);
    } else if (lvl.theme === 'night_castle') {
      // Starry Night Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 600);
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(camX, 0, 800, 600);

      // Twinkling Stars
      ctx.fillStyle = '#fef08a';
      for (let i = 0; i < 40; i++) {
        const sx = (i * 90 + camX * 0.2) % 3600;
        const sy = (i * 37) % 300;
        ctx.fillRect(sx, sy, 2, 2);
      }

      // Moon
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(camX + 650, 90, 40, 0, Math.PI * 2);
      ctx.fill();

      // Dark Castle Silhouettes
      ctx.fillStyle = '#0f172a';
      [300, 1100, 2000, 2900].forEach((cx) => {
        ctx.fillRect(cx, 320, 140, 200);
        ctx.fillRect(cx + 20, 240, 100, 80);
      });

      // Dark Floor
      ctx.fillStyle = '#334155';
      ctx.fillRect(camX, 520, 800, 80);
    } else if (lvl.theme === 'peach_castle') {
      // Royal Castle Wallpaper
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 600);
      skyGrad.addColorStop(0, '#fbcfe8');
      skyGrad.addColorStop(1, '#f43f5e');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(camX, 0, 800, 600);

      // Stained Glass Windows
      ctx.fillStyle = '#38bdf8';
      [400, 1200, 2000, 2800, 3400].forEach((wx) => {
        ctx.fillRect(wx, 120, 60, 120);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.strokeRect(wx, 120, 60, 120);
      });

      // Marble Pillars
      ctx.fillStyle = '#f8fafc';
      [200, 800, 1600, 2400, 3200].forEach((px) => {
        ctx.fillRect(px, 0, 40, 520);
      });

      // Royal Carpet Floor
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(camX, 520, 800, 80);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(camX, 520, 800, 6);
    } else if (lvl.theme === 'bowser_castle') {
      // Fiery Red Castle
      ctx.fillStyle = '#18181b';
      ctx.fillRect(camX, 0, 800, 600);

      // Bubbling Lava
      const lavaGrad = ctx.createLinearGradient(0, 520, 0, 600);
      lavaGrad.addColorStop(0, '#ef4444');
      lavaGrad.addColorStop(0.5, '#f97316');
      lavaGrad.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(camX, 520, 800, 80);

      // Heat glow
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.fillRect(camX, 420, 800, 100);
    } else if (lvl.theme === 'bonus_sky') {
      // Golden Starry Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 600);
      skyGrad.addColorStop(0, '#312e81');
      skyGrad.addColorStop(1, '#4338ca');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(camX, 0, 800, 600);

      // Golden Clouds
      ctx.fillStyle = '#fde047';
      [150, 500, 900, 1300].forEach((cx) => {
        ctx.beginPath();
        ctx.arc(cx, 380, 50, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };

  // DRAW PIPE
  const drawPipe = (ctx: CanvasRenderingContext2D, pipe: Pipe) => {
    const isWarp = pipe.isWarpPipe;

    // Pipe Cap
    ctx.fillStyle = isWarp ? '#16a34a' : '#15803d';
    ctx.fillRect(pipe.x - 4, pipe.y, pipe.width + 8, 20);

    if (isWarp) {
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#fde047';
      ctx.strokeRect(pipe.x - 4, pipe.y, pipe.width + 8, 20);

      // Label above warp pipe indicating destination
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';

      let label = 'WARP [▼]';
      if (pipe.targetLevel === 'bonus') {
        label = '⭐ BONUS [▼]';
      } else if (pipe.targetLevel === 'return') {
        label = '🚪 EXIT [▼]';
      } else if (typeof pipe.targetLevel === 'number') {
        label = `🌀 WORLD ${pipe.targetLevel} [▼]`;
      }

      ctx.fillText(label, pipe.x + pipe.width / 2, pipe.y - 8);
      ctx.textAlign = 'left';
    } else {
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 1;
      ctx.strokeRect(pipe.x - 4, pipe.y, pipe.width + 8, 20);
    }

    // Pipe Body
    ctx.fillStyle = isWarp ? '#22c55e' : '#16a34a';
    ctx.fillRect(pipe.x, pipe.y + 20, pipe.width, pipe.height - 20);
    ctx.strokeStyle = '#14532d';
    ctx.lineWidth = 1;
    ctx.strokeRect(pipe.x, pipe.y + 20, pipe.width, pipe.height - 20);
  };

  // DRAW BLOCK
  const drawBlock = (ctx: CanvasRenderingContext2D, b: Block) => {
    const drawY = b.y + (b.bounceOffsetY || 0);

    if (b.type === 'lucky') {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(b.x, drawY, b.width, b.height);
      ctx.strokeStyle = '#fef08a';
      ctx.strokeRect(b.x, drawY, b.width, b.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('?', b.x + 10, drawY + 24);
    } else if (b.type === 'empty') {
      ctx.fillStyle = '#64748b';
      ctx.fillRect(b.x, drawY, b.width, b.height);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(b.x, drawY, b.width, b.height);
    } else if (b.type === 'brick') {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(b.x, drawY, b.width, b.height);
      ctx.strokeStyle = '#78350f';
      ctx.strokeRect(b.x, drawY, b.width, b.height);
      // Brick pattern
      ctx.beginPath();
      ctx.moveTo(b.x, drawY + 16);
      ctx.lineTo(b.x + b.width, drawY + 16);
      ctx.stroke();
    } else if (b.type === 'stone') {
      ctx.fillStyle = '#475569';
      ctx.fillRect(b.x, drawY, b.width, b.height);
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(b.x, drawY, b.width, b.height);
    }
  };

  // DRAW GOOMBA
  const drawGoomba = (ctx: CanvasRenderingContext2D, g: Goomba) => {
    if (g.squished) {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(g.x, g.y + 20, g.width, 12);
      return;
    }

    // Goomba Body
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.arc(g.x + 16, g.y + 16, 16, Math.PI, 0);
    ctx.fillRect(g.x + 4, g.y + 16, 24, 12);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(g.x + 8, g.y + 12, 5, 8);
    ctx.fillRect(g.x + 19, g.y + 12, 5, 8);
    ctx.fillStyle = '#000000';
    ctx.fillRect(g.x + 10, g.y + 14, 3, 4);
    ctx.fillRect(g.x + 19, g.y + 14, 3, 4);

    // Feet
    ctx.fillStyle = '#451a03';
    ctx.fillRect(g.x, g.y + 26, 10, 6);
    ctx.fillRect(g.x + 22, g.y + 26, 10, 6);
  };

  // DRAW BOWSER
  const drawBowser = (ctx: CanvasRenderingContext2D, b: any) => {
    ctx.fillStyle = '#15803d'; // Green shell
    ctx.fillRect(b.x + 20, b.y, 50, 70);

    ctx.fillStyle = '#f59e0b'; // Yellow body
    ctx.fillRect(b.x, b.y + 20, 30, 50);

    // Horns & Spikes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(b.x + 10, b.y + 10);
    ctx.lineTo(b.x + 20, b.y - 10);
    ctx.lineTo(b.x + 25, b.y + 10);
    ctx.fill();

    // Glowing Red Eyes
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(b.x + 5, b.y + 25, 8, 8);

    // Fire breathing mouth
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(b.x - 10, b.y + 35, 15, 12);
  };

  // DRAW FLAGPOLE
  const drawFlagpole = (ctx: CanvasRenderingContext2D, flag: any) => {
    // Silver Pole
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(flag.x + 10, flag.y, 8, flag.height);

    // Golden Ball Top
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(flag.x + 14, flag.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Green Flag
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(flag.x + 18, flag.flagY);
    ctx.lineTo(flag.x + 60, flag.flagY + 15);
    ctx.lineTo(flag.x + 18, flag.flagY + 30);
    ctx.fill();
  };

  // DRAW PLAYER SPRITE
  const drawPlayer = (ctx: CanvasRenderingContext2D, p: PlayerState, char: CharacterInfo) => {
    // Invincibility Grace Flash
    if (p.invincibleTimer > 0 && Math.floor(p.invincibleTimer / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
    if (p.facingLeft) {
      ctx.scale(-1, 1);
    }

    const w = p.width;
    const h = p.height;

    // Star Invincible Rainbow Glow
    if (p.starInvincibleTimer > 0) {
      ctx.shadowColor = `hsl(${(p.starInvincibleTimer * 20) % 360}, 100%, 50%)`;
      ctx.shadowBlur = 15;
    }

    // Overalls / Body
    ctx.fillStyle = p.powerUp === 'flower' ? '#ffffff' : char.overallColor;
    ctx.fillRect(-w / 2, -h / 2 + 16, w, h - 16);

    // Shirt
    ctx.fillStyle = p.powerUp === 'flower' ? '#ef4444' : char.primaryColor;
    ctx.fillRect(-w / 2 + 2, -h / 2 + 10, w - 4, 12);

    // Head / Skin
    ctx.fillStyle = char.skinColor;
    ctx.fillRect(-w / 2 + 4, -h / 2 + 2, w - 8, 12);

    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(w / 2 - 10, -h / 2 + 5, 3, 4);

    // Hat / Crown
    ctx.fillStyle = p.powerUp === 'flower' ? '#ffffff' : char.hatColor;
    ctx.fillRect(-w / 2 + 2, -h / 2 - 4, w - 2, 8);

    ctx.restore();
  };

  return (
    <div id="mario-canvas-container" className="relative w-full flex items-center justify-center bg-slate-950 p-2 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className="w-full max-w-[900px] h-auto aspect-[4/3] bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-800 cursor-pointer"
      />
    </div>
  );
};
