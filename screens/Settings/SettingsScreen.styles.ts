import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  content:   { paddingBottom: 48 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backBtn:  { width: 32, alignItems: 'flex-start' },
  backText: { color: '#FFFFFF', fontSize: 22 },
  title: {
    color: '#555555', fontSize: 11,
    fontWeight: '800', letterSpacing: 1.5,
  },

  section: { paddingHorizontal: 24, marginBottom: 24 },
  label: {
    color: '#444444', fontSize: 10,
    fontWeight: '800', letterSpacing: 1.5,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 12,
    color: '#FFFFFF', fontSize: 15,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  handleRow:   { flexDirection: 'row', alignItems: 'center' },
  at:          { color: '#555555', fontSize: 15, fontWeight: '700', marginRight: 8 },
  handleInput: { flex: 1 },

  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    marginBottom: 8,
  },
  walletAddr: { flex: 1, color: '#AAAAAA', fontSize: 12, fontFamily: 'monospace' },
  removeBtn:  { paddingLeft: 12 },
  removeText: { color: '#555555', fontSize: 22, lineHeight: 22 },

  addRow:   { flexDirection: 'row', gap: 8, marginTop: 4 },
  addInput: { flex: 1, fontSize: 12 },
  addBtn: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 12,
    width: 52, alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { color: '#FFFFFF', fontSize: 24, lineHeight: 28 },

  saveBtn: {
    marginHorizontal: 24,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnDim:  { opacity: 0.6 },
  saveBtnText: { color: '#000000', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
});
