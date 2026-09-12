/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ==========================================
// VIDEO EDITOR ENGINE TYPES
// ==========================================

export type TrackType = "video" | "audio" | "text";

export interface TimelineTrack {
  index: number;
  type: TrackType;
  name: string;
}

export type ProjectAspectRatio = "16:9" | "9:16" | "1:1";

export interface ClipTextStyle {
  fontSize: number; // in pixels (relative to rendering height or font scale)
  color: string;
  backgroundColor: string;
  outlineColor: string;
  outlineWidth: number;
  positionX: number; // 0 (left) to 100 (right) percent of screen
  positionY: number; // 0 (top) to 100 (bottom) percent of screen
  align: "left" | "center" | "right";
  animation: "none" | "fade" | "slide" | "scale" | "typewriter";
}

export interface Clip {
  id: string;
  name: string;
  type: TrackType;
  trackIndex: number; // 0: Video Track, 1: Audio Track, 2: Subtitle/Text overlays, etc.
  startTime: number; // Start location in timeline (seconds)
  duration: number; // Pacing/Duration (seconds)
  sourceDuration: number; // Maximum limit of its media file (seconds)
  mediaUrl: string; // Preview URL (video visual, audio source, or background)
  mediaType: "file" | "stock" | "text_only";
  volume: number; // 0 to 1 for Audio, 1 by default
  speed: number; // Playback rate, e.g. 0.5, 1.0, 1.5, 2.0
  filter: "none" | "grayscale" | "sepia" | "vintage" | "monochrome" | "cold" | "invert" | "blur";
  text?: string; // Text string if type is text
  textStyle?: ClipTextStyle;
  transition?: string; // Optional transition effect name
  linkedGroupId?: string; // Optional group ID of linked video + audio clips
}

export interface StockAsset {
  id: string;
  name: string;
  type: TrackType;
  category: string;
  mediaUrl: string;
  thumbnailUrl: string;
  duration: number; // in seconds
  artist?: string;
}

export interface AIScriptScene {
  time: number;
  duration: number;
  title: string;
  visualDescription: string;
  narration: string;
  overlayText: string;
}

export interface AIScriptResponse {
  title: string;
  summary: string;
  scriptText: string;
  scenes: AIScriptScene[];
  suggestedTags?: string[];
}

export interface AISubtitle {
  start: number;
  end: number;
  text: string;
}

export interface AICopilotMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

// ==========================================
// AI EXPLORERS SHOWCASE & CURRICULUM TYPES
// ==========================================

export type PageTab = 
  | 'home' 
  | 'about' 
  | 'impact' 
  | 'why-us' 
  | 'programs' 
  | 'curriculum' 
  | 'gallery' 
  | 'testimonials' 
  | 'faq';

export interface StudentProject {
  id: string;
  title: string;
  studentName?: string;
  studentGrade?: string;
  category: string;
  badgeColor: string;
  tools: string[];
  description: string;
  featured?: boolean;
  showcaseAvailable?: boolean;
  thumbnailUrl?: string;
  audioUrl?: string;
  liveUrl?: string;
  youtubeUrl?: string;
  isInteractiveGame?: boolean;
  isInteractiveEditor?: boolean;
  gameId?: string;
  editorId?: string;
  fullContent?: {
    keyFeatures?: string[];
    teacherNotes?: string;
    promptUsed?: string;
  };
}

export interface ProgramVideoItem {
  id: string;
  header: string;
  videoUrl?: string;
  thumbnailUrl: string;
  status: 'available' | 'coming-soon';
  badge: string;
  actionText?: string;
}

export interface Program {
  id: string;
  title: string;
  status: string;
  subtitle: string;
  description: string;
  duration: string;
  schedule: string;
  targetAudience: string;
  highlights: string[];
  iconName: string;
  badge: string;
  gradient: string;
  signupText?: string;
  signupUrl?: string;
  showQrCode?: boolean;
  videoItems?: ProgramVideoItem[];
}

export interface CurriculumStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  detailedOutcome: string;
  toolsUsed: string[];
  sampleProject: string;
  iconName: string;
  previewImage?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  difficulty: string;
  format: string;
  contentSnippet: string;
  linkText: string;
  downloadable?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  parentName: string;
  studentDetail: string;
  avatarBg: string;
  rating: number;
}

// ==========================================
// SUPER MARIO 2D GAME TYPES
// ==========================================

export type CharacterId = 'mario' | 'luigi' | 'toad' | 'peach' | 'yoshi' | 'wario';

export interface CharacterInfo {
  id: CharacterId;
  name: string;
  title: string;
  speed: number;
  jumpPower: number;
  floatAbility: boolean;
  unlockCostCoins: number;
  primaryColor: string;
  hatColor: string;
  overallColor: string;
  skinColor: string;
  description: string;
}

export type PowerUpType = 'none' | 'mushroom' | 'flower' | 'star';

export interface GameStats {
  score: number;
  coins: number;
  lives: number;
  currentLevel: number;
  unlockedCharacters: CharacterId[];
  greenStarsCollected: number;
}

export interface PlayerState {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  facingLeft: boolean;
  characterId: CharacterId;
  powerUp: PowerUpType;
  invincibleTimer: number;
  starInvincibleTimer: number;
  jumpCount: number;
  maxJumps: number;
  isFloating: boolean;
  isSprinting: boolean;
  isCrouching: boolean;
}

export interface Block {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'brick' | 'lucky' | 'stone' | 'ground' | 'empty' | string;
  contains?: 'coin' | 'mushroom' | 'flower' | 'star' | 'none' | string;
  isHit?: boolean;
  hit?: boolean;
  bounceY?: number;
  bounceOffsetY?: number;
  empty?: boolean;
}

export interface Coin {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  collected?: boolean;
  isCollected?: boolean;
  isGreenStar?: boolean;
}

export interface Goomba {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  vx?: number;
  vy?: number;
  alive?: boolean;
  squished?: boolean;
  squishTimer?: number;
  facingLeft?: boolean;
  isBoss?: boolean;
  hp?: number;
  maxHp?: number;
  jumpTimer?: number;
  fireballTimer?: number;
  type?: 'goomba' | 'koopa' | 'bowser';
}

export interface Pipe {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isWarpPipe?: boolean;
  targetLevel?: number | 'bonus' | 'return';
  targetX?: number;
  targetY?: number;
}

export interface Flagpole {
  x: number;
  y: number;
  height: number;
  flagY?: number;
  reached?: boolean;
  slideProgress?: number;
}

export interface Fireball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width?: number;
  height?: number;
  radius?: number;
  life?: number;
  active?: boolean;
  bounces?: number;
  fromPlayer?: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size?: number;
  text?: string;
}

export interface LevelConfig {
  id: number;
  name: string;
  subtitle: string;
  difficulty: string;
  theme: string;
  width: number;
  height: number;
  gravity: number;
  spawnPoint: { x: number; y: number };
  blocks: Block[];
  coins?: Coin[];
  goombas?: Goomba[];
  pipes?: Pipe[];
  flagpole?: Flagpole;
  bowserBridge?: any;
  bowser?: any;
  peachCage?: any;
  bridgeSwitch?: any;
  bridgeTiles?: any;
}
