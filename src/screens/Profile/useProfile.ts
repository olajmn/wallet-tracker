import { useEffect, useMemo, useState } from 'react';
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
  const [snapshotMap, setSnapshotMap] = useState<Map<string, Snapshot[]>>(new Map());

  useEffect(() => {
    if (userData.wallets.length === 0) return;
    Promise.all(
      userData.wallets.map(addr =>
        loadSnapshotsForAddress(addr).then(snaps => [addr, snaps] as [string, Snapshot[]])
      )
    ).then(entries => setSnapshotMap(new Map(entries)));
  }, [userData.wallets.join(',')]);

  useEffect(() => {
    if (userData.wallets.length === 0) { setLoading(false); setWalletDataMap(new Map()); return; }
    setLoading(true);
    Promise.all(
      userData.wallets.map(addr =>
        fetchWalletData(addr)
          .then(data => [addr, data] as [string, WalletData])
          .catch(() => [addr, null] as [string, null])
      )
    ).then(results => {
      const map = new Map(results);
      setWalletDataMap(map);
      setLoading(false);
      const snapshotEntries = [...map.entries()]
        .filter(([, w]) => w !== null)
        .map(([addr, w]) => ({ address: addr, solBalance: w!.solBalance }));
      saveSnapshots(snapshotEntries).then(() =>
        Promise.all(
          userData.wallets.map(addr =>
            loadSnapshotsForAddress(addr).then(snaps => [addr, snaps] as [string, Snapshot[]])
          )
        ).then(e => setSnapshotMap(new Map(e)))
      );
    });
  }, [userData.wallets.join(',')]);

  const totalSOL = [...walletDataMap.values()].reduce((sum, w) => sum + (w?.solBalance ?? 0), 0);
  const totalUSD = [...walletDataMap.values()].reduce((sum, w) => sum + (w?.totalUSD ?? 0), 0);
  const charWord = useMemo(() => charWords[Math.floor(Math.random() * charWords.length)], []);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setActiveWallet(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));
  }

  return { userData, updateUser, activeWallet, walletDataMap, totalSOL, totalUSD, onScroll, charWord, snapshotMap };
}
