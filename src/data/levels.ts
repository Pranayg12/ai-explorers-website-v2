import { LevelConfig, Block, Coin, Goomba, Pipe } from '../types';

// Helper generators to quickly assemble level elements
function createPipe(id: string, x: number, groundY: number, height: number = 60, isWarp: boolean = false, targetLevel?: number | 'bonus' | 'return', targetX?: number, targetY?: number): Pipe {
  return {
    id,
    x,
    y: groundY - height,
    width: 50,
    height,
    isWarpPipe: isWarp,
    targetLevel,
    targetX,
    targetY,
  };
}

// Level 1: Standard Green Rolling Hills (Easy)
export const LEVEL_1: LevelConfig = {
  id: 1,
  name: 'Level 1: Mushroom Hills',
  subtitle: 'The Journey Begins',
  difficulty: 'Easy',
  theme: 'rolling_hills',
  width: 3200,
  height: 600,
  gravity: 0.65,
  spawnPoint: { x: 80, y: 400 },
  blocks: [
    // Ground blocks are handled by level physics ground unless there's a gap
    // Ground gaps at x: 1200..1300, 2100..2220

    // First Block Formation
    { id: 'b1-1', x: 300, y: 350, width: 32, height: 32, type: 'brick' },
    { id: 'b1-2', x: 332, y: 350, width: 32, height: 32, type: 'lucky', contains: 'mushroom' },
    { id: 'b1-3', x: 364, y: 350, width: 32, height: 32, type: 'brick' },
    { id: 'b1-4', x: 396, y: 350, width: 32, height: 32, type: 'lucky', contains: 'coin' },
    { id: 'b1-5', x: 428, y: 350, width: 32, height: 32, type: 'brick' },

    // High lucky block
    { id: 'b1-6', x: 364, y: 230, width: 32, height: 32, type: 'lucky', contains: 'flower' },

    // Second Block Formation
    { id: 'b1-7', x: 800, y: 350, width: 32, height: 32, type: 'brick' },
    { id: 'b1-8', x: 832, y: 350, width: 32, height: 32, type: 'lucky', contains: 'star' },
    { id: 'b1-9', x: 864, y: 350, width: 32, height: 32, type: 'brick' },

    // Gap platforms
    { id: 'b1-10', x: 1220, y: 320, width: 64, height: 24, type: 'stone' },

    // Staircase 1
    { id: 'st1-1', x: 1500, y: 448, width: 32, height: 32, type: 'stone' },
    { id: 'st1-2', x: 1532, y: 416, width: 32, height: 64, type: 'stone' },
    { id: 'st1-3', x: 1564, y: 384, width: 32, height: 96, type: 'stone' },
    { id: 'st1-4', x: 1596, y: 352, width: 32, height: 128, type: 'stone' },

    // Block row 3
    { id: 'b1-11', x: 1800, y: 330, width: 32, height: 32, type: 'lucky', contains: 'coin' },
    { id: 'b1-12', x: 1832, y: 330, width: 32, height: 32, type: 'brick' },
    { id: 'b1-13', x: 1864, y: 330, width: 32, height: 32, type: 'lucky', contains: 'mushroom' },
    { id: 'b1-14', x: 1896, y: 330, width: 32, height: 32, type: 'brick' },

    // Final Staircase to Flag
    { id: 'st2-1', x: 2450, y: 448, width: 32, height: 32, type: 'stone' },
    { id: 'st2-2', x: 2482, y: 416, width: 32, height: 64, type: 'stone' },
    { id: 'st2-3', x: 2514, y: 384, width: 32, height: 96, type: 'stone' },
    { id: 'st2-4', x: 2546, y: 352, width: 32, height: 128, type: 'stone' },
    { id: 'st2-5', x: 2578, y: 320, width: 32, height: 160, type: 'stone' },
  ],
  coins: [
    { id: 'c1', x: 300, y: 300, width: 20, height: 20, collected: false },
    { id: 'c2', x: 332, y: 300, width: 20, height: 20, collected: false },
    { id: 'c3', x: 364, y: 180, width: 20, height: 20, collected: false },
    { id: 'c4', x: 396, y: 300, width: 20, height: 20, collected: false },
    { id: 'c5', x: 428, y: 300, width: 20, height: 20, collected: false },
    { id: 'c6', x: 1230, y: 270, width: 20, height: 20, collected: false },
    { id: 'c7', x: 1250, y: 270, width: 20, height: 20, collected: false },
    { id: 'c8', x: 1800, y: 280, width: 20, height: 20, collected: false },
    { id: 'c9', x: 1832, y: 280, width: 20, height: 20, collected: false },
    { id: 'c10', x: 1864, y: 280, width: 20, height: 20, collected: false },
  ],
  goombas: [
    { id: 'g1', x: 500, y: 448, width: 32, height: 32, vx: -1.2, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g2', x: 750, y: 448, width: 32, height: 32, vx: -1.2, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g3', x: 1050, y: 448, width: 32, height: 32, vx: -1.2, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g4', x: 1700, y: 448, width: 32, height: 32, vx: -1.5, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g5', x: 2000, y: 448, width: 32, height: 32, vx: -1.5, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
  ],
  pipes: [
    createPipe('p1', 600, 480, 50),
    // Secret Warp Pipe to Starry Bonus Level!
    createPipe('p2', 1000, 480, 70, true, 'bonus'),
    createPipe('p3', 1400, 480, 60),
    // Secret Warp Shortcut Pipe directly to World 2!
    createPipe('p1-warp2', 2000, 480, 80, true, 2, 120, 400),
    createPipe('p4', 2250, 480, 80),
  ],
  flagpole: {
    x: 2800,
    y: 180,
    height: 300,
    flagY: 200,
    reached: false,
    slideProgress: 0,
  },
};

// Level 2: Nighttime Castle (Medium)
export const LEVEL_2: LevelConfig = {
  id: 2,
  name: 'Level 2: Nighttime Outpost',
  subtitle: 'Shadows over the Castle',
  difficulty: 'Medium',
  theme: 'night_castle',
  width: 3600,
  height: 600,
  gravity: 0.68,
  spawnPoint: { x: 80, y: 400 },
  blocks: [
    // Platforms across gaps
    { id: 'b2-1', x: 400, y: 350, width: 32, height: 32, type: 'lucky', contains: 'mushroom' },
    { id: 'b2-2', x: 432, y: 350, width: 32, height: 32, type: 'brick' },
    { id: 'b2-3', x: 464, y: 350, width: 32, height: 32, type: 'lucky', contains: 'coin' },

    // Gap platforming 1
    { id: 'b2-p1', x: 800, y: 380, width: 96, height: 24, type: 'stone' },
    { id: 'b2-p2', x: 1000, y: 320, width: 96, height: 24, type: 'stone' },
    { id: 'b2-p3', x: 1200, y: 260, width: 96, height: 24, type: 'stone' },

    // Floating lucky block stack
    { id: 'b2-4', x: 1032, y: 200, width: 32, height: 32, type: 'lucky', contains: 'flower' },

    // Second section
    { id: 'b2-5', x: 1500, y: 350, width: 32, height: 32, type: 'brick' },
    { id: 'b2-6', x: 1532, y: 350, width: 32, height: 32, type: 'lucky', contains: 'star' },
    { id: 'b2-7', x: 1564, y: 350, width: 32, height: 32, type: 'brick' },

    // Castle battlement platforms
    { id: 'b2-p4', x: 1900, y: 380, width: 128, height: 24, type: 'stone' },
    { id: 'b2-p5', x: 2150, y: 320, width: 128, height: 24, type: 'stone' },
    { id: 'b2-p6', x: 2400, y: 280, width: 128, height: 24, type: 'stone' },

    { id: 'b2-8', x: 2200, y: 180, width: 32, height: 32, type: 'lucky', contains: 'coin' },

    // Staircase
    { id: 'st2-1', x: 2800, y: 448, width: 32, height: 32, type: 'stone' },
    { id: 'st2-2', x: 2832, y: 416, width: 32, height: 64, type: 'stone' },
    { id: 'st2-3', x: 2864, y: 384, width: 32, height: 96, type: 'stone' },
    { id: 'st2-4', x: 2896, y: 352, width: 32, height: 128, type: 'stone' },
  ],
  coins: [
    { id: 'c21', x: 830, y: 330, width: 20, height: 20, collected: false },
    { id: 'c22', x: 1030, y: 270, width: 20, height: 20, collected: false },
    { id: 'c23', x: 1230, y: 210, width: 20, height: 20, collected: false },
    { id: 'c24', x: 1930, y: 330, width: 20, height: 20, collected: false },
    { id: 'c25', x: 2180, y: 270, width: 20, height: 20, collected: false },
    { id: 'c26', x: 2430, y: 230, width: 20, height: 20, collected: false },
  ],
  goombas: [
    { id: 'g21', x: 500, y: 448, width: 32, height: 32, vx: -1.6, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g22', x: 830, y: 348, width: 32, height: 32, vx: -1.2, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g23', x: 1530, y: 318, width: 32, height: 32, vx: -1.6, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g24', x: 1950, y: 348, width: 32, height: 32, vx: -1.8, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g25', x: 2450, y: 248, width: 32, height: 32, vx: -1.8, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
  ],
  pipes: [
    createPipe('p21', 650, 480, 60),
    // Secret Warp Pipe to Starry Vault
    createPipe('p22', 1250, 480, 80, true, 'bonus'),
    createPipe('p23', 1700, 480, 80),
    // Secret Warp Pipe Shortcut directly to World 3!
    createPipe('p2-warp2', 2300, 480, 80, true, 3, 120, 400),
    createPipe('p24', 2600, 480, 70),
  ],
  flagpole: {
    x: 3200,
    y: 180,
    height: 300,
    flagY: 200,
    reached: false,
    slideProgress: 0,
  },
};

// Level 3: Peach's Castle (Hard)
export const LEVEL_3: LevelConfig = {
  id: 3,
  name: "Level 3: Peach's Sanctuary",
  subtitle: 'The Princess Has Been Kidnapped!',
  difficulty: 'Hard',
  theme: 'peach_castle',
  width: 4000,
  height: 600,
  gravity: 0.7,
  spawnPoint: { x: 80, y: 400 },
  blocks: [
    // Royal pillars & elevated platforms
    { id: 'b3-1', x: 350, y: 320, width: 32, height: 32, type: 'lucky', contains: 'flower' },
    { id: 'b3-2', x: 382, y: 320, width: 32, height: 32, type: 'brick' },
    { id: 'b3-3', x: 414, y: 320, width: 32, height: 32, type: 'lucky', contains: 'mushroom' },

    // High jumping challenge
    { id: 'b3-p1', x: 700, y: 380, width: 80, height: 24, type: 'stone' },
    { id: 'b3-p2', x: 880, y: 300, width: 80, height: 24, type: 'stone' },
    { id: 'b3-p3', x: 1060, y: 220, width: 80, height: 24, type: 'stone' },

    { id: 'b3-4', x: 904, y: 160, width: 32, height: 32, type: 'lucky', contains: 'star' },

    // Middle Courtyard
    { id: 'b3-5', x: 1400, y: 330, width: 32, height: 32, type: 'brick' },
    { id: 'b3-6', x: 1432, y: 330, width: 32, height: 32, type: 'lucky', contains: 'coin' },
    { id: 'b3-7', x: 1464, y: 330, width: 32, height: 32, type: 'brick' },
    { id: 'b3-8', x: 1496, y: 330, width: 32, height: 32, type: 'lucky', contains: 'flower' },

    // Stained Glass corridor gaps
    { id: 'b3-p4', x: 1800, y: 360, width: 64, height: 24, type: 'stone' },
    { id: 'b3-p5', x: 2000, y: 300, width: 64, height: 24, type: 'stone' },
    { id: 'b3-p6', x: 2200, y: 240, width: 64, height: 24, type: 'stone' },
    { id: 'b3-p7', x: 2400, y: 300, width: 64, height: 24, type: 'stone' },

    // High lucky row
    { id: 'b3-9', x: 2016, y: 180, width: 32, height: 32, type: 'lucky', contains: 'mushroom' },

    // Pre-flag staircase
    { id: 'st3-1', x: 3100, y: 448, width: 32, height: 32, type: 'stone' },
    { id: 'st3-2', x: 3132, y: 416, width: 32, height: 64, type: 'stone' },
    { id: 'st3-3', x: 3164, y: 384, width: 32, height: 96, type: 'stone' },
    { id: 'st3-4', x: 3196, y: 352, width: 32, height: 128, type: 'stone' },
    { id: 'st3-5', x: 3228, y: 320, width: 32, height: 160, type: 'stone' },
  ],
  coins: [
    { id: 'c31', x: 730, y: 330, width: 20, height: 20, collected: false },
    { id: 'c32', x: 910, y: 250, width: 20, height: 20, collected: false },
    { id: 'c33', x: 1090, y: 170, width: 20, height: 20, collected: false },
    { id: 'c34', x: 1820, y: 310, width: 20, height: 20, collected: false },
    { id: 'c35', x: 2020, y: 250, width: 20, height: 20, collected: false },
    { id: 'c36', x: 2220, y: 190, width: 20, height: 20, collected: false },
  ],
  goombas: [
    { id: 'g31', x: 400, y: 448, width: 32, height: 32, vx: -2.0, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g32', x: 1430, y: 298, width: 32, height: 32, vx: -1.8, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g33', x: 1820, y: 328, width: 32, height: 32, vx: -2.0, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g34', x: 2600, y: 448, width: 32, height: 32, vx: -2.2, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g35', x: 2850, y: 448, width: 32, height: 32, vx: -2.2, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
  ],
  pipes: [
    createPipe('p31', 550, 480, 60),
    // Secret Warp Pipe to Starry Vault
    createPipe('p32', 1250, 480, 70, true, 'bonus'),
    createPipe('p33', 1700, 480, 70),
    // Secret Dungeon Shortcut directly to Bowser's Castle (World 4)!
    createPipe('p3-warp2', 2700, 480, 80, true, 4, 120, 380),
    createPipe('p34', 2800, 480, 80),
  ],
  flagpole: {
    x: 3600,
    y: 180,
    height: 300,
    flagY: 200,
    reached: false,
    slideProgress: 0,
  },
};

// Level 4: Bowser's Lava Dungeon (Near Impossible)
export const LEVEL_4: LevelConfig = {
  id: 4,
  name: "Level 4: Bowser's Lava Lair",
  subtitle: 'Defeat Bowser & Rescue Peach!',
  difficulty: 'Near Impossible',
  theme: 'bowser_castle',
  width: 3200,
  height: 600,
  gravity: 0.72,
  spawnPoint: { x: 80, y: 380 },
  blocks: [
    // Dangerous lava leaps & stone bridges
    { id: 'b4-1', x: 300, y: 320, width: 32, height: 32, type: 'lucky', contains: 'flower' },
    { id: 'b4-2', x: 332, y: 320, width: 32, height: 32, type: 'brick' },

    // Floating stepping stones over bubbling lava
    { id: 'b4-p1', x: 600, y: 360, width: 64, height: 24, type: 'stone' },
    { id: 'b4-p2', x: 780, y: 320, width: 64, height: 24, type: 'stone' },
    { id: 'b4-p3', x: 960, y: 280, width: 64, height: 24, type: 'stone' },
    { id: 'b4-p4', x: 1140, y: 340, width: 64, height: 24, type: 'stone' },

    { id: 'b4-3', x: 976, y: 180, width: 32, height: 32, type: 'lucky', contains: 'star' },

    // Middle platform
    { id: 'b4-mid', x: 1400, y: 400, width: 250, height: 80, type: 'stone' },
    { id: 'b4-4', x: 1500, y: 280, width: 32, height: 32, type: 'lucky', contains: 'mushroom' },
    { id: 'b4-5', x: 1532, y: 280, width: 32, height: 32, type: 'lucky', contains: 'flower' },

    // Pre-boss gauntlet
    { id: 'b4-p5', x: 1800, y: 360, width: 64, height: 24, type: 'stone' },
    { id: 'b4-p6', x: 1980, y: 300, width: 64, height: 24, type: 'stone' },

    // Fortress floor before boss bridge
    { id: 'b4-boss-floor-start', x: 2150, y: 420, width: 120, height: 80, type: 'stone' },
  ],
  coins: [
    { id: 'c41', x: 620, y: 310, width: 20, height: 20, collected: false },
    { id: 'c42', x: 800, y: 270, width: 20, height: 20, collected: false },
    { id: 'c43', x: 980, y: 230, width: 20, height: 20, collected: false },
    { id: 'c44', x: 1820, y: 310, width: 20, height: 20, collected: false },
  ],
  goombas: [
    { id: 'g41', x: 400, y: 448, width: 32, height: 32, vx: -2.2, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g42', x: 1450, y: 368, width: 32, height: 32, vx: -2.4, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g43', x: 1550, y: 368, width: 32, height: 32, vx: -2.4, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
    { id: 'g44', x: 2180, y: 388, width: 32, height: 32, vx: -2.5, vy: 0, alive: true, squished: false, squishTimer: 0, facingLeft: true },
  ],
  pipes: [
    createPipe('p41', 450, 480, 70),
    // Secret Armory Vault (Bonus Level)
    createPipe('p42', 1100, 480, 80, true, 'bonus'),
    // Fortress Secret Tunnel bypassing pre-boss gauntlet to Boss Floor
    createPipe('p43', 1750, 480, 80, true, 4, 2160, 380),
  ],
  // Bowser boss fight specs
  bowser: {
    id: 'bowser-boss',
    x: 2500,
    y: 340,
    width: 80,
    height: 80,
    vx: -1.0,
    vy: 0,
    health: 5,
    maxHealth: 5,
    alive: true,
    fallingInLava: false,
    lavaY: 520,
    attackTimer: 0,
    facingLeft: true,
  },
  peachCage: {
    x: 2750,
    y: 220,
    width: 60,
    height: 70,
    saved: false,
  },
  bridgeSwitch: {
    x: 2700,
    y: 385,
    width: 35,
    height: 35,
    pressed: false,
  },
  // Bridge tiles spanning under Bowser to the switch (from x: 2270 to 2730)
  bridgeTiles: Array.from({ length: 15 }).map((_, i) => ({
    x: 2270 + i * 30,
    y: 420,
    width: 30,
    height: 20,
  })),
};

// Level 5: Secret Bonus Level (Green Star Heaven)
export const LEVEL_BONUS: LevelConfig = {
  id: 5,
  name: 'Bonus Level: Starry Vault',
  subtitle: 'Collect the Green Star & Gold Coins!',
  difficulty: 'Bonus',
  theme: 'bonus_sky',
  width: 1800,
  height: 600,
  gravity: 0.6,
  spawnPoint: { x: 100, y: 350 },
  blocks: [
    // Golden Cloud platforms
    { id: 'bp-1', x: 200, y: 350, width: 120, height: 24, type: 'stone' },
    { id: 'bp-2', x: 420, y: 280, width: 120, height: 24, type: 'stone' },
    { id: 'bp-3', x: 640, y: 220, width: 120, height: 24, type: 'stone' },
    { id: 'bp-4', x: 860, y: 160, width: 120, height: 24, type: 'stone' },
    { id: 'bp-5', x: 1080, y: 220, width: 120, height: 24, type: 'stone' },

    { id: 'bl-1', x: 460, y: 180, width: 32, height: 32, type: 'lucky', contains: 'green_star' },
    { id: 'bl-2', x: 880, y: 80, width: 32, height: 32, type: 'lucky', contains: 'star' },
  ],
  coins: [
    // Floating coins in star patterns
    { id: 'bc1', x: 220, y: 300, width: 20, height: 20, collected: false },
    { id: 'bc2', x: 250, y: 300, width: 20, height: 20, collected: false },
    { id: 'bc3', x: 280, y: 300, width: 20, height: 20, collected: false },

    { id: 'bc4', x: 440, y: 230, width: 20, height: 20, collected: false },
    { id: 'bc5', x: 470, y: 230, width: 20, height: 20, collected: false },
    { id: 'bc6', x: 500, y: 230, width: 20, height: 20, collected: false },

    { id: 'bc7', x: 660, y: 170, width: 20, height: 20, collected: false },
    { id: 'bc8', x: 690, y: 170, width: 20, height: 20, collected: false },
    { id: 'bc9', x: 720, y: 170, width: 20, height: 20, collected: false },

    // Special Green Star Item
    { id: 'green-star-1', x: 900, y: 110, width: 36, height: 36, collected: false, isGreenStar: true },

    { id: 'bc10', x: 1100, y: 170, width: 20, height: 20, collected: false },
    { id: 'bc11', x: 1130, y: 170, width: 20, height: 20, collected: false },
    { id: 'bc12', x: 1160, y: 170, width: 20, height: 20, collected: false },
  ],
  goombas: [], // Peaceful bonus level
  pipes: [
    // Warp pipe back to whichever main level player entered from!
    createPipe('bp-exit', 1400, 480, 80, true, 'return'),
  ],
};

export const ALL_LEVELS: Record<number, LevelConfig> = {
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_BONUS,
};
