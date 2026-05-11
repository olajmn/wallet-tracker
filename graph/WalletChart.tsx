import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildRealHistory } from './walletHistory';
import PortfolioChart from './PortfolioChart';

type DataPoint = { date: string; value: number };

type Props = {
  address: string;
  solBalance: number;
  currentValue: number;
  fallbackHistory: DataPoint[];
};

const cacheKey = (address: string) => `chart:v3:${address}`;

export default function WalletChart({ address, solBalance, currentValue, fallbackHistory }: Props) {
  const [history, setHistory] = useState<DataPoint[] | null>(null);

  useEffect(() => {
    async function load() {
      // Vis cachet historikk umiddelbart hvis det finnes
      const cached = await AsyncStorage.getItem(cacheKey(address));
      if (cached) {
        const parsed: DataPoint[] = JSON.parse(cached);
        if (parsed.length >= 2) setHistory(parsed);
      }

      // Hent ekte historikk i bakgrunnen
      try {
        const real = await buildRealHistory(address, solBalance);
        if (real.length >= 2) {
          setHistory(real);
          await AsyncStorage.setItem(cacheKey(address), JSON.stringify(real));
        } else if (!cached) {
          setHistory([]);
        }
      } catch {
        if (!cached) setHistory([]);
      }
    }

    load();
  }, [address]);

  if (history === null) {
    return (
      <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#444444" />
      </View>
    );
  }

  return (
    <PortfolioChart
      history={history.length >= 2 ? history : fallbackHistory}
      currentValue={currentValue}
    />
  );
}
