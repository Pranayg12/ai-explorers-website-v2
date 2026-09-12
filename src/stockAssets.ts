/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StockAsset } from "./types";

export const STOCK_VIDEOS: StockAsset[] = [
  {
    id: "vid-neon-grid",
    name: "Cyberpunk Neon Grid",
    type: "video",
    category: "Abstract",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-retro-futuristic-grid-34198-500.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=150&auto=format&fit=crop&q=60",
    duration: 15,
    artist: "Mixkit Studio"
  },
  {
    id: "vid-starfield",
    name: "Deep Space Starfield",
    type: "video",
    category: "Nature",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-rotating-starry-night-sky-background-42171-500.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=150&auto=format&fit=crop&q=60",
    duration: 20,
    artist: "Stargazer"
  },
  {
    id: "vid-abstract-waves",
    name: "Liquid Purple Waves",
    type: "video",
    category: "Fluid",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-purple-liquid-bubbles-48937-500.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&auto=format&fit=crop&q=60",
    duration: 10,
    artist: "FlowCreator"
  },
  {
    id: "vid-matrix-rain",
    name: "Matrix Code Stream",
    type: "video",
    category: "Tech",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-green-computer-code-42866-500.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=60",
    duration: 12,
    artist: "ByteCode"
  },
  {
    id: "vid-clouds",
    name: "Sunset Golden Clouds",
    type: "video",
    category: "Nature",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-clouds-moving-under-a-golden-sunset-42358-500.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=150&auto=format&fit=crop&q=60",
    duration: 30,
    artist: "NatureStream"
  }
];

export const STOCK_AUDIOS: StockAsset[] = [
  {
    id: "aud-lofi-dreams",
    name: "Lo-Fi Dreams Beat",
    type: "audio",
    category: "Chill",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnailUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150&auto=format&fit=crop&q=60",
    duration: 372,
    artist: "ChillHop Collective"
  },
  {
    id: "aud-tech-cyber",
    name: "Cyberpunk Tech Groove",
    type: "audio",
    category: "Energetic",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=60",
    duration: 302,
    artist: "Synthesizer Labs"
  },
  {
    id: "aud-ambient-space",
    name: "Ambient Cosmos Synth",
    type: "audio",
    category: "Calm",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    thumbnailUrl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=150&auto=format&fit=crop&q=60",
    duration: 318,
    artist: "Ethereal Soundscapes"
  }
];

export const STOCK_TEXTS = [
  {
    id: "text-simple-sub",
    name: "Clean Subtitle",
    type: "text",
    text: "Your Text Here",
    textStyle: {
      fontSize: 24,
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,0.5)",
      outlineColor: "#000000",
      outlineWidth: 1,
      positionX: 50,
      positionY: 82,
      align: "center",
      animation: "fade"
    }
  },
  {
    id: "text-bold-header",
    name: "Vlog Bold Title",
    type: "text",
    text: "ADVENTURE TIME",
    textStyle: {
      fontSize: 48,
      color: "#facc15", // yellow-400
      backgroundColor: "transparent",
      outlineColor: "#1e293b",
      outlineWidth: 4,
      positionX: 50,
      positionY: 20,
      align: "center",
      animation: "scale"
    }
  },
  {
    id: "text-cyberneon",
    name: "Cyberpunk Neon Pop",
    type: "text",
    text: "// NEON CORE ACTIVE",
    textStyle: {
      fontSize: 32,
      color: "#ec4899", // pink-500
      backgroundColor: "transparent",
      outlineColor: "#1e1b4b",
      outlineWidth: 2,
      positionX: 50,
      positionY: 50,
      align: "center",
      animation: "typewriter"
    }
  }
];
