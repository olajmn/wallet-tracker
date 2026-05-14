import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

type Props = { size?: number };

export default function SolanaLogo({ size = 24 }: Props) {
  return (
    <Svg width={size} height={size * 311 / 397} viewBox="0 0 397 311" fill="none">
      <Defs>
        <LinearGradient id="sol" x1="397" y1="0" x2="0" y2="311" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#00FFA3" />
          <Stop offset="1" stopColor="#DC1FFF" />
        </LinearGradient>
      </Defs>
      <Path
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.1 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
        fill="url(#sol)"
      />
      <Path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.1-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.1 3.8h317.4c5.8 0 8.7-7 4.6-11.1z"
        fill="url(#sol)"
      />
      <Path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.1-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.1 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
        fill="url(#sol)"
      />
    </Svg>
  );
}
