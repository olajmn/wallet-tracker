import { Dimensions, StyleSheet } from 'react-native';
import { colors, font, radius, spacing } from '../../config/theme';

export const SCREEN_W = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content:   { paddingBottom: spacing.xxl },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 56,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  avatarWrapper: { alignItems: 'center', marginRight: 4 },
  avatar: {
    width: 72, height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.bgSubtle,
    borderWidth: 1, borderColor: '#333333',
  },
  charPill: {
    marginTop: -10,
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: radius.full,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  charPillText: { color: '#888888', fontSize: font.xs, fontWeight: font.bold, letterSpacing: 0.5 },

  headerInfo: { flex: 1, alignSelf: 'center' },
  name:   { color: colors.textPrimary, fontSize: font.lg, fontWeight: font.black, lineHeight: 24 },
  handle: { color: '#444444', fontSize: font.sm, lineHeight: 16 },
  bio:    { color: '#555555', fontSize: font.base, lineHeight: 18 },

  statBox:    { alignItems: 'center', alignSelf: 'center', marginRight: 12 },
  statNumber: { color: colors.textPrimary, fontSize: font.lg, fontWeight: font.black, lineHeight: 24 },
  statLabel:  { color: '#444444', fontSize: 8, fontWeight: font.bold, letterSpacing: 1, lineHeight: 16 },

  divider: { height: 1, backgroundColor: '#1A1A1A', marginHorizontal: spacing.xl, marginBottom: 20 },

  pager: { flexGrow: 0 },
  walletPage: { paddingBottom: 8 },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: 4,
  },
  walletName:    { color: colors.textPrimary, fontSize: font.base, fontWeight: font.heavy },
  walletAddress: { color: colors.textMuted, fontSize: font.sm },


  dots:      { flexDirection: 'row', gap: 6, justifyContent: 'center', marginTop: 8 },
  dot:       { width: 6, height: 6, borderRadius: radius.full, backgroundColor: '#333333' },
  dotActive: { backgroundColor: colors.textPrimary },
  dotAdd:    { backgroundColor: '#222222', borderWidth: 1, borderColor: '#333333' },

  addPage: { alignItems: 'center', justifyContent: 'center', paddingTop: 60 },
  addPageIcon: {
    width: 56, height: 56, borderRadius: radius.full,
    backgroundColor: colors.bgSubtle,
    borderWidth: 1, borderColor: colors.borderSubtle,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  addPagePlus:  { color: '#555555', fontSize: 28, lineHeight: 32 },
  addPageLabel: { color: '#333333', fontSize: font.sm, fontWeight: font.heavy, letterSpacing: 1.5 },


  totalCard: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  totalLabel:  { color: '#555555', fontSize: font.xs, fontWeight: font.heavy, letterSpacing: 1.5, marginBottom: 8 },
  totalAmount: { color: colors.textPrimary, fontSize: 44, fontWeight: font.black, letterSpacing: -1 },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalBox: {
    backgroundColor: colors.bgSubtle,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 24, width: '85%',
  },
  modalTitle: {
    color: colors.textPrimary, fontSize: font.sm,
    fontWeight: font.heavy, letterSpacing: 1.5, marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#111',
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm,
    color: colors.textPrimary, fontSize: font.base,
    paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 12,
  },
  modalBtn: {
    backgroundColor: colors.textPrimary,
    borderRadius: radius.sm,
    paddingVertical: 14, alignItems: 'center',
  },
  modalBtnText: { color: '#000', fontSize: font.sm, fontWeight: font.heavy, letterSpacing: 1 },

  historySection: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  historyInCard: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgSubtle,
  },
  historyLabel: { color: '#555555', fontSize: font.sm },
  historyValue: { color: colors.textPrimary, fontSize: font.sm, fontWeight: font.semibold },
  historyMore:  { color: '#444444', fontSize: font.xs, marginTop: 8, textAlign: 'center' },

  solCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    paddingVertical: 8,
  },
  solAmount:  { color: colors.textPrimary, fontSize: font.xl, fontWeight: font.black, marginTop: 4 },
  solUSD:     { color: '#555555', fontSize: font.base, fontWeight: font.medium, marginTop: 4 },
  totalUSD:   { color: colors.green, fontSize: font.lg, fontWeight: font.semibold, marginTop: 4 },
});
