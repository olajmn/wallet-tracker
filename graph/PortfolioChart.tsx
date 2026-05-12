import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Defs, Line, LinearGradient, Path, Stop, Svg, Text as SvgText } from 'react-native-svg';
import { styles, SCREEN_W, H, PAD_V, LABEL_W, PAD_R, CHART_W } from './PortfolioChart.styles';

type DataPoint = { date: string; value: number };

type Props = {
  history: DataPoint[];
  currentValue: number;
};

function fmtSOL(v: number): string {
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k◎`;
  if (v >= 10)    return `${Math.round(v)}◎`;
  return `${v.toFixed(2)}◎`;
}

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function toCoords(points: DataPoint[], min: number, max: number) {
  const range = max - min || 1;
  return points.map((p, i) => ({
    x: LABEL_W + (i / (points.length - 1)) * CHART_W,
    y: PAD_V + (1 - (p.value - min) / range) * (H - PAD_V * 2),
  }));
}

function buildSmoothPath(coords: { x: number; y: number }[]) {
  if (coords.length < 2) return { line: '', fill: '' };
  let line = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cpx = (prev.x + curr.x) / 2;
    line += ` C ${cpx} ${prev.y} ${cpx} ${curr.y} ${curr.x} ${curr.y}`;
  }
  const last = coords[coords.length - 1];
  const fill = `${line} L ${last.x} ${H} L ${LABEL_W} ${H} Z`;
  return { line, fill };
}

export default function PortfolioChart({ history, currentValue }: Props) {
  const gradId = useMemo(() => `grad_${Math.random().toString(36).slice(2)}`, []);

  const startValue = history.find(p => p.value > 0)?.value ?? 0;
  const lastValue  = history.length >= 2 ? history[history.length - 1].value : startValue;
  const change     = startValue > 0 ? ((lastValue - startValue) / startValue) * 100 : 0;
  const isPositive = change >= 0;
  const color      = isPositive ? '#00FF88' : '#FF4444';

  const values = history.map(p => p.value);
  const minVal = history.length > 0 ? Math.min(...values) : 0;
  const maxVal = history.length > 0 ? Math.max(...values) : currentValue;
  const midVal = (minVal + maxVal) / 2;

  const yTop = PAD_V;
  const yMid = H / 2;
  const yBot = H - PAD_V;

  const midDate = history.length > 2
    ? fmtDate(history[Math.floor(history.length / 2)].date)
    : null;

  const coords = history.length >= 2 ? toCoords(history, minVal, maxVal) : [];
  const { line, fill } = buildSmoothPath(coords);

  return (
    <View style={styles.container}>

      <Text style={styles.value}>${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
      <Text style={[styles.change, { color }]}>
        {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}% since start
      </Text>
      <Text style={styles.startSum}>
        started at {startValue.toFixed(2)}◎
      </Text>

      <Svg width={SCREEN_W} height={H} style={styles.chart}>
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%"   stopColor={color} stopOpacity="0.2" />
            <Stop offset="100%" stopColor={color} stopOpacity="0"   />
          </LinearGradient>
        </Defs>

        <Line x1={LABEL_W} y1={yTop} x2={SCREEN_W - PAD_R} y2={yTop} stroke="#1E1E1E" strokeWidth={1} />
        <Line x1={LABEL_W} y1={yMid} x2={SCREEN_W - PAD_R} y2={yMid} stroke="#1E1E1E" strokeWidth={1} />
        <Line x1={LABEL_W} y1={yBot} x2={SCREEN_W - PAD_R} y2={yBot} stroke="#1E1E1E" strokeWidth={1} />

        <SvgText x={0} y={yTop + 4} fill="#444" fontSize={9} fontWeight="600">{fmtSOL(maxVal)}</SvgText>
        <SvgText x={0} y={yMid + 4} fill="#444" fontSize={9} fontWeight="600">{fmtSOL(midVal)}</SvgText>
        <SvgText x={0} y={yBot + 4} fill="#444" fontSize={9} fontWeight="600">{fmtSOL(minVal)}</SvgText>

        {fill ? <Path d={fill} fill={`url(#${gradId})`} /> : null}
        {line ? <Path d={line} stroke={color} strokeWidth={2} fill="none" /> : null}
      </Svg>

      <View style={styles.xAxis}>
        <Text style={styles.xLabel}>{history.length > 0 ? fmtDate(history[0].date) : 'START'}</Text>
        {midDate && <Text style={styles.xLabel}>{midDate}</Text>}
        <Text style={styles.xLabel}>TODAY</Text>
      </View>

    </View>
  );
}
