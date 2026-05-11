import { getRank } from './ranks';

export const achievements = [
  { icon: '💎', name: 'Diamond Hands',  unlocked: true },
  { icon: '☠️', name: 'Void Walker',    unlocked: false },
  { icon: '🩸', name: 'Bloodbath',      unlocked: false },
  { icon: '👻', name: 'Ghost Protocol', unlocked: false },
  { icon: '🌑', name: 'Dark Matter',    unlocked: false },
  { icon: '🔪', name: 'Cut Throat',     unlocked: false },
];

export const userRank = getRank(0);
