import { StyleSheet } from 'react-native';
import { colors, font } from '../../config/theme';

export const styles = StyleSheet.create({
  label:     { color: colors.textMuted, fontSize: font.xs, fontWeight: font.heavy, letterSpacing: 1.5, marginBottom: 8 },
  bioInput:  { minHeight: 90, textAlignVertical: 'top' },
  handleRow: { flexDirection: 'row', alignItems: 'center' },
  at:        { color: '#555555', fontSize: font.md, fontWeight: font.bold, marginRight: 8 },
});
