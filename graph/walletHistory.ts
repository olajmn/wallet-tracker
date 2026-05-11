const API_KEY = process.env.EXPO_PUBLIC_HELIUS_KEY;
const BASE = 'https://api.helius.xyz/v0';

type DataPoint = { date: string; value: number };

async function fetchSolPrices(days: number): Promise<Map<string, number>> {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=${days}`
    );
    const data = await res.json();
    const map = new Map<string, number>();
    for (const [ts, price] of data.prices ?? []) {
      map.set(new Date(ts).toISOString().slice(0, 10), price);
    }
    return map;
  } catch {
    return new Map();
  }
}

async function fetchCurrentSolPrice(): Promise<number> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    );
    const data = await res.json();
    return data?.solana?.usd ?? 0;
  } catch {
    return 0;
  }
}

const CUTOFF_MS = Date.now() - 800 * 24 * 60 * 60 * 1000;

async function fetchTransactions(address: string): Promise<any[]> {
  const all: any[] = [];
  let before: string | null = null;

  while (true) {
    const url: string = before
      ? `${BASE}/addresses/${address}/transactions?api-key=${API_KEY}&before=${before}`
      : `${BASE}/addresses/${address}/transactions?api-key=${API_KEY}`;

    let page: any[] | null = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res: Response = await fetch(url);
        const data: any = await res.json();
        if (Array.isArray(data)) { page = data; break; }
      } catch {}
      await new Promise(r => setTimeout(r, 300));
    }

    if (!page || page.length === 0) break;

    const filtered = page.filter(tx => tx.timestamp * 1000 >= CUTOFF_MS);
    all.push(...filtered);

    if (filtered.length < page.length) break;

    before = page[page.length - 1].signature;

    await new Promise(r => setTimeout(r, 200));
  }

  return all;
}

const inProgress = new Map<string, Promise<DataPoint[]>>();
let globalFetchQueue: Promise<void> = Promise.resolve();

export function buildRealHistory(
  address: string,
  currentSolBalance: number
): Promise<DataPoint[]> {
  if (inProgress.has(address)) return inProgress.get(address)!;

  let settle!: (result: DataPoint[]) => void;
  const promise = new Promise<DataPoint[]>(res => { settle = res; });

  globalFetchQueue = globalFetchQueue
    .catch(() => {})
    .then(() => _buildRealHistory(address, currentSolBalance))
    .then(settle)
    .catch(() => settle([]));

  inProgress.set(address, promise);
  promise.finally(() => inProgress.delete(address));
  return promise;
}

async function _buildRealHistory(
  address: string,
  currentSolBalance: number
): Promise<DataPoint[]> {
  const [transactions, priceMap] = await Promise.all([
    fetchTransactions(address),
    fetchSolPrices(800),
  ]);

  if (transactions.length === 0) return [];

  // Hvis CoinGecko feilet, bruk nåværende SOL-pris for alle datoer
  const fallbackPrice = priceMap.size === 0 ? await fetchCurrentSolPrice() : 0;

  const priceDates = [...priceMap.keys()].sort();

  function priceFor(date: string): number {
    if (fallbackPrice > 0) return fallbackPrice;
    if (priceMap.has(date)) return priceMap.get(date)!;
    const nearest = priceDates.find(d => d >= date) ?? priceDates[priceDates.length - 1];
    return priceMap.get(nearest) ?? 0;
  }

  // Rekonstruer SOL-saldo bakover i tid fra nåværende saldo
  let balance = currentSolBalance;
  const dailyBalances = new Map<string, number>();
  dailyBalances.set(new Date().toISOString().slice(0, 10), balance);

  for (const tx of transactions) {
    const date = new Date(tx.timestamp * 1000).toISOString().slice(0, 10);
    for (const t of tx.nativeTransfers ?? []) {
      if (t.toUserAccount === address)   balance -= t.amount / 1_000_000_000;
      if (t.fromUserAccount === address) balance += t.amount / 1_000_000_000;
    }
    dailyBalances.set(date, Math.max(0, balance));
  }

  return [...dailyBalances.keys()]
    .sort()
    .map(date => ({
      date,
      value: parseFloat(((dailyBalances.get(date) ?? 0) * priceFor(date)).toFixed(2)),
    }))
    .filter(p => p.value > 0);
}
