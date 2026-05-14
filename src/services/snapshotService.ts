import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'solSnapshots';
const MAX_DAYS = 1000;

export type Snapshot = {
  date: string;
  address: string;
  solBalance: number;
};

export async function saveSnapshots(entries: { address: string; solBalance: number }[]): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const raw = await AsyncStorage.getItem(KEY);
  const snapshots: Snapshot[] = raw ? JSON.parse(raw) : [];

  for (const entry of entries) {
    const existing = snapshots.findIndex(s => s.date === today && s.address === entry.address);
    if (existing >= 0) {
      snapshots[existing].solBalance = entry.solBalance;
    } else {
      snapshots.push({ date: today, address: entry.address, solBalance: entry.solBalance });
    }
  }

  const trimmed = snapshots.slice(-MAX_DAYS * entries.length);
  await AsyncStorage.setItem(KEY, JSON.stringify(trimmed));
}

export async function loadSnapshotsForAddress(address: string): Promise<Snapshot[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const all: Snapshot[] = raw ? JSON.parse(raw) : [];
  return all.filter(s => s.address === address).sort((a, b) => a.date.localeCompare(b.date));
}
