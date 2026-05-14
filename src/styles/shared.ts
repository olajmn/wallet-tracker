import { StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../config/theme';

export const shared = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content:   { paddingBottom: spacing.xxl },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  backBtn:  { width: 32, alignItems: 'flex-start' },
  backText: { color: colors.textPrimary, fontSize: 22 },
  title:    { color: colors.textMuted, fontSize: font.xs, fontWeight: font.heavy, letterSpacing: 1.5 },

  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },

  input: {
    backgroundColor: colors.bgSubtle,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.textPrimary, fontSize: font.md,
    paddingHorizontal: spacing.lg, paddingVertical: 14,
  },

  saveBtn: {
    marginHorizontal: spacing.xl, marginTop: spacing.sm,
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md, paddingVertical: spacing.lg, alignItems: 'center',
  },
  saveBtnDim:  { opacity: 0.6 },
  saveBtnText: { color: colors.bg, fontSize: font.base, fontWeight: font.heavy, letterSpacing: 1 },
});
