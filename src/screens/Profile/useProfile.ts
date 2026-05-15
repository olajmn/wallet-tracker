import { useCallback, useEffect, useMemo, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { fetchWalletData, WalletData } from '../../services/walletService';
import { loadSnapshotsForAddress, saveSnapshots, Snapshot } from '../../services/snapshotService';
import { useUser } from '../../context/UserContext';
import { charWords } from '../../mock/charWords';
import { SCREEN_W } from './ProfileScreen.styles';

export function useProfile() {
  const { userData, updateUser } = useUser();
  const [activeWallet, setActiveWallet] = useState(0);
  const [walletDataMap, setWalletDataMap] = useState<Map<string, WalletData | null>>(new Map());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snapshotMap, setSnapshotMap] = useState<Map<string, Snapshot[]>>(new Map());

  const fetchAll = useCallback(async (wallets: string[]) => {
    if (wallets.length === 0) { setLoading(false); setWalletDataMap(new Map()); return; }
    setWalletDataMap(new Map());
    const results = await Promise.all(
      wallets.map(addr =>
        fetchWalletData(addr)
          .then(data => [addr, data] as [string, WalletData])
          .catch(() => [addr, null] as [string, null])
      )
    );
    const map = new Map(results);
    setWalletDataMap(map);
    setLoading(false);
    const snapshotEntries = [...map.entries()]
      .filter(([, w]) => w !== null)
      .map(([addr, w]) => ({ address: addr, solBalance: w!.solBalance }));
    await saveSnapshots(snapshotEntries);
    const snapEntries = await Promise.all(
      wallets.map(addr =>
        loadSnapshotsForAddress(addr).then(snaps => [addr, snaps] as [string, Snapshot[]])
      )
    );
    setSnapshotMap(new Map(snapEntries));
  }, []);

  useEffect(() => {
    if (userData.wallets.length === 0) return;
    Promise.all(
      userData.wallets.map(addr =>
        loadSnapshotsForAddress(addr).then(snaps => [addr, snaps] as [string, Snapshot[]])
      )
    ).then(entries => setSnapshotMap(new Map(entries)));
  }, [userData.wallets.join(',')]);

  useEffect(() => {
    setLoading(true);
    fetchAll(userData.wallets);
  }, [userData.wallets.join(',')]);

  async function onRefresh() {
    setRefreshing(true);
    await fetchAll(userData.wallets);
    setRefreshing(false);
  }

  const totalSOL = [...walletDataMap.entries()].reduce((sum, [addr, w]) => {
    if (w) return sum + w.solBalance;
    const lastSnap = (snapshotMap.get(addr) ?? []).at(-1);
    return sum + (lastSnap?.solBalance ?? 0);
  }, 0);
  const totalUSD = [...walletDataMap.values()].reduce((sum, w) => sum + (w?.totalUSD ?? 0), 0);
  const charWord = useMemo(() => charWords[Math.floor(Math.random() * charWords.length)], []);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setActiveWallet(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));
  }

  return { userData, updateUser, activeWallet, setActiveWallet, walletDataMap, loading, refreshing, onRefresh, totalSOL, totalUSD, onScroll, charWord, snapshotMap };
}
