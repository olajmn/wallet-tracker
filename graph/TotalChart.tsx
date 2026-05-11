import { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildRealHistory } from './walletHistory';
import PortfolioChart from './PortfolioChart';

type DataPoint = { date: string; value: number };
type WalletRef  = { address: string; solBalance: number; currentValue: number };

type Props = {
  wallets: WalletRef[];
  totalUSD: number;
  fallbackHistory: DataPoint[];
};

const cacheKey = (address: string) => `chart:v3:${address}`;

function mergeHistories(histories: DataPoint[][]): DataPoint[] {
  const allDates = [...new Set(histories.flatMap(h => h.map(p => p.date)))].sort();
  return allDates.map(date => {
    const total = histories.reduce((sum, history) => {
      const exact = history.find(p => p.date === date);
      if (exact) return sum + exact.value;
      const lastKnown = [...history].reverse().find(p => p.date <= date);
      return sum + (lastKnown?.value ?? 0);
    }, 0);
    return { date, value: total };
  });
}

export default function TotalChart({ wallets, totalUSD, fallbackHistory }: Props) {
  const [history, setHistory] = useState<DataPoint[]>([]);
  const addressKey = wallets.map(w => w.address).join(',');

  useEffect(() => {
    if (wallets.length === 0) return;

    async function load() {
      const histories = await Promise.all(
        wallets.map(async w => {
          // Bruk cache hvis tilgjengelig — unngå doble Helius-kall
          const cached = await AsyncStorage.getItem(cacheKey(w.address));
          if (cached) {
            const parsed: DataPoint[] = JSON.parse(cached);
            if (parsed.length >= 2) return parsed;
          }
          return buildRealHistory(w.address, w.solBalance).catch(() => []);
        })
      );

      const valid  = histories.filter(h => h.length >= 2);
      const merged = mergeHistories(valid);
      if (merged.length >= 2) setHistory(merged);
    }

    load();
  }, [addressKey]);

  return (
    <PortfolioChart
      history={history.length >= 2 ? history : fallbackHistory}
      currentValue={totalUSD}
    />
  );
}
