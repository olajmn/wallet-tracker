import { Rank } from '../types';

export const RANKS: Rank[] = [
  { icon: '🐙', goldenIcon: '✨🐙', name: 'Plankton', minUSD: 0       },
  { icon: '🦐', goldenIcon: '✨🦐', name: 'Shrimp',   minUSD: 1000    },
  { icon: '🐟', goldenIcon: '✨🐟', name: 'Fish',     minUSD: 10000   },
  { icon: '🦈', goldenIcon: '✨🦈', name: 'Shark',    minUSD: 100000  },
  { icon: '🐋', goldenIcon: '✨🐋', name: 'Whale',    minUSD: 1000000 },
];

export function getRank(portfolioUSD: number): Rank {
  return [...RANKS].reverse().find(r => portfolioUSD >= r.minUSD) ?? RANKS[0];
}
