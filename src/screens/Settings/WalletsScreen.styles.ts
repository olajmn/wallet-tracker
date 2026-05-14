import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../../config/theme';

export const styles = StyleSheet.create({
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSubtle,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg, paddingVertical: 14,
    marginBottom: spacing.sm,
  },
  walletAddr: { flex: 1, color: '#AAAAAA', fontSize: font.sm, fontFamily: 'monospace' },
  removeBtn:  { paddingLeft: spacing.md },
  removeText: { color: colors.textMuted, fontSize: 22, lineHeight: 22 },

  addRow:   { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  addInput: { flex: 1, fontSize: font.sm },
  addBtn: {
    backgroundColor: colors.bgSubtle,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
    width: 52, alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { color: colors.textPrimary, fontSize: 24, lineHeight: 28 },
});
