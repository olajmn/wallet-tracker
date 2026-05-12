import { Dimensions, StyleSheet } from 'react-native';

export const SCREEN_W = Dimensions.get('window').width;
export const H        = 130;
export const PAD_V    = 10;
export const LABEL_W  = 44;
export const PAD_R    = 8;
export const CHART_W  = SCREEN_W - LABEL_W - PAD_R;

export const styles = StyleSheet.create({
  container: { paddingTop: 8, paddingBottom: 12 },
  value: {
    fontSize: 36, fontWeight: '900',
    color: '#FFFFFF', letterSpacing: -1,
    paddingHorizontal: 24,
  },
  change: {
    fontSize: 13, fontWeight: '700',
    marginTop: 2, marginBottom: 4,
    paddingHorizontal: 24,
  },
  startSum: {
    fontSize: 11, fontWeight: '600',
    color: '#444444',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  chart: {},
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 6,
  },
  xLabel: {
    color: '#333333', fontSize: 10,
    fontWeight: '700', letterSpacing: 0.5,
  },
});
