import { CharacterInfo } from '../types';

export const CHARACTERS: Record<string, CharacterInfo> = {
  mario: {
    id: 'mario',
    name: 'Mario',
    title: 'The Mushroom Kingdom Hero',
    speed: 5.2,
    jumpPower: 12.8,
    floatAbility: false,
    unlockCostCoins: 0,
    primaryColor: '#e52521', // Red shirt / hat
    hatColor: '#e52521',
    overallColor: '#0026ca', // Blue overalls
    skinColor: '#fcc89b',
    description: 'Balanced speed & jump. Default unlocked hero!',
  },
  luigi: {
    id: 'luigi',
    name: 'Luigi',
    title: 'The High Jumper',
    speed: 4.9,
    jumpPower: 14.5,
    floatAbility: false,
    unlockCostCoins: 20,
    primaryColor: '#00a800', // Green
    hatColor: '#00a800',
    overallColor: '#0026ca',
    skinColor: '#fcc89b',
    description: 'Jumps higher than Mario with slightly lighter gravity!',
  },
  toad: {
    id: 'toad',
    name: 'Toad',
    title: 'Speedy Mushroom Lad',
    speed: 6.8,
    jumpPower: 11.5,
    floatAbility: false,
    unlockCostCoins: 40,
    primaryColor: '#3b82f6', // Blue vest
    hatColor: '#ffffff', // White mushroom cap with red spots
    overallColor: '#ffffff',
    skinColor: '#fcc89b',
    description: 'Super fast sprinter with quick double-jump recovery!',
  },
  peach: {
    id: 'peach',
    name: 'Princess Peach',
    title: 'Royal Floating Princess',
    speed: 5.0,
    jumpPower: 12.5,
    floatAbility: true,
    unlockCostCoins: 60,
    primaryColor: '#ff69b4', // Pink dress
    hatColor: '#fbbf24', // Gold crown
    overallColor: '#ff1493',
    skinColor: '#fde047',
    description: 'Hold Jump in mid-air to float gracefully across gaps!',
  },
  yoshi: {
    id: 'yoshi',
    name: 'Yoshi',
    title: 'The Fluttering Dinosaur',
    speed: 5.6,
    jumpPower: 13.8,
    floatAbility: true,
    unlockCostCoins: 80,
    primaryColor: '#22c55e', // Green Yoshi
    hatColor: '#e52521', // Red saddle
    overallColor: '#ffffff', // White belly
    skinColor: '#f97316', // Orange shoes
    description: 'High Flutter Jump with extra double-jump height!',
  },
  wario: {
    id: 'wario',
    name: 'Wario',
    title: 'The Greedy Powerhouse',
    speed: 5.0,
    jumpPower: 12.2,
    floatAbility: false,
    unlockCostCoins: 100,
    primaryColor: '#facc15', // Yellow shirt
    hatColor: '#facc15',
    overallColor: '#7e22ce', // Purple overalls
    skinColor: '#fcc89b',
    description: 'Heavy ground pound force & extra coin bonus modifier!',
  },
};
