const API_KEY = process.env.EXPO_PUBLIC_HELIUS_KEY;
const BASE = 'https://api.helius.xyz/v0';

export type TokenBalance = {
  mint: string;
  symbol: string;
  name: string;
  amount: number;
  decimals: number;
  usdValue?: number;
  logoURI?: string;
};

export type WalletData = {
  address: string;
  solBalance: number;
  solUSD: number;
  tokens: TokenBalance[];
  totalUSD: number;
};

async function fetchSolPrice(): Promise<number> {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
  const data = await res.json();
  return data.solana?.usd ?? 0;
}

export async function fetchWalletData(address: string): Promise<WalletData> {
  const [res, solPrice] = await Promise.all([
    fetch(`${BASE}/addresses/${address}/balances?api-key=${API_KEY}`),
    fetchSolPrice(),
  ]);
  const data = await res.json();

  const solBalance = (data.nativeBalance ?? 0) / 1_000_000_000;
  const solUSD = solBalance * solPrice;

  const tokens: TokenBalance[] = (data.tokens ?? [])
    .filter((t: any) => t.amount > 0)
    .map((t: any) => ({
      mint:     t.mint,
      symbol:   t.tokenInfo?.symbol ?? t.mint.slice(0, 4),
      name:     t.tokenInfo?.name   ?? 'Unknown',
      amount:   t.amount / Math.pow(10, t.tokenInfo?.decimals ?? 0),
      decimals: t.tokenInfo?.decimals ?? 0,
      usdValue: t.tokenInfo?.priceInfo?.totalPrice ?? undefined,
      logoURI:  t.tokenInfo?.imagUri ?? undefined,
    }));

  const tokenUSD = tokens.reduce((sum, t) => sum + (t.usdValue ?? 0), 0);
  const totalUSD = solUSD + tokenUSD;

  return { address, solBalance, solUSD, tokens, totalUSD };
}
