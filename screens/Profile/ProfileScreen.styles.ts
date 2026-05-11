import { Dimensions, StyleSheet } from 'react-native';

export const SCREEN_W = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  content:   { paddingBottom: 48 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  avatarWrapper:   { marginRight: 24, alignItems: 'center' },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 88, height: 88,
    borderRadius: 999,
    backgroundColor: '#1A1A1A',
    borderWidth: 2, borderColor: '#333333',
  },
  rankBadge: { position: 'absolute', top: 62, left: 62, fontSize: 22 },
  charPill: {
    marginTop: -8,
    alignSelf: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  charPillText: { color: '#AAAAAA', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  settingsBtn:  { position: 'absolute', top: 56, right: 24, padding: 4 },
  settingsIcon: { color: '#444444', fontSize: 20 },

  statsRow:   { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statBox:    { alignItems: 'center' },
  statNumber: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  statLabel:  { color: '#555555', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: '#222222' },

  nameSection: { paddingHorizontal: 24, paddingBottom: 20 },
  name:   { color: '#FFFFFF', fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  handle: { color: '#555555', fontSize: 14, fontWeight: '500', marginTop: 2, marginBottom: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  tagText: { color: '#AAAAAA', fontSize: 11, fontWeight: '600' },
  bio: { color: '#555555', fontSize: 13, lineHeight: 18, marginTop: 12 },

  pager: { flexGrow: 0 },
  walletPage: { paddingBottom: 8 },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 4,
  },
  walletName:    { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  walletAddress: { color: '#444444', fontSize: 11 },

  tradesSection: { paddingHorizontal: 16, paddingTop: 8 },
  tradesLabel: {
    fontSize: 11, fontWeight: '800',
    color: '#444444', letterSpacing: 1.5,
    marginBottom: 12,
  },

  dots:      { flexDirection: 'row', gap: 6, paddingHorizontal: 24, marginTop: 8 },
  dot:       { width: 6, height: 6, borderRadius: 999, backgroundColor: '#333333' },
  dotActive: { backgroundColor: '#FFFFFF' },
  dotAdd:    { backgroundColor: '#222222', borderWidth: 1, borderColor: '#333333' },

  addPage: { alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  addPageIcon: {
    width: 56, height: 56, borderRadius: 999,
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  addPagePlus:  { color: '#555555', fontSize: 28, lineHeight: 32 },
  addPageLabel: { color: '#333333', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },

  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  tokenSymbol: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', width: 52 },
  tokenName:   { color: '#555555', fontSize: 11, flex: 1 },
  tokenRight:  { alignItems: 'flex-end' },
  tokenAmount: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  tokenUSD:    { color: '#00FF88', fontSize: 10, fontWeight: '600', marginTop: 1 },
  errorText:   { color: '#555555', fontSize: 12, marginTop: 12 },
});
