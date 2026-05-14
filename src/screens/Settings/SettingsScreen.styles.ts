import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../../config/theme';

export const styles = StyleSheet.create({
  menu: {
    marginHorizontal: spacing.xl,
    backgroundColor: colors.bgSubtle,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  rowLabel: { color: colors.textPrimary, fontSize: font.md, fontWeight: font.medium },
  rowArrow: { color: colors.textMuted, fontSize: font.lg },
  divider:  { height: 1, backgroundColor: colors.border, marginHorizontal: 20 },
});
