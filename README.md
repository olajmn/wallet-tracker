# Wallet Tracker

A mobile app for tracking your Solana wallet holdings. Built with React Native + Expo.

## What it does

- Add your Solana wallet addresses
- See your SOL balance and token holdings in real time
- Simple profile with name and handle

## Tech stack

- React Native + Expo
- TypeScript
- Helius API (wallet data)
- CoinGecko API (SOL price)

## Getting started

**1. Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/wallet-tracker-mobile.git
cd wallet-tracker-mobile
npm install
```

**2. Add your API key**

Create a `.env` file in the root:
```
EXPO_PUBLIC_HELIUS_KEY=your_key_here
```

Get a free API key at [helius.xyz](https://helius.xyz).

**3. Run the app**
```bash
npx expo start
```

Then scan the QR code with Expo Go on your phone.
