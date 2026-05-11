import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

export default function WalletsScreen() {
  const navigation = useNavigation();
  const { userData, updateUser } = useUser();

  const [wallets, setWallets]     = useState<string[]>(userData.wallets);
  const [newWallet, setNewWallet] = useState('');
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  function addWallet() {
    const addr = newWallet.trim();
    if (!addr || wallets.includes(addr)) return;
    setWallets(prev => [...prev, addr]);
    setNewWallet('');
  }

  function removeWallet(addr: string) {
    setWallets(prev => prev.filter(w => w !== addr));
  }

  async function handleSave() {
    setSaving(true);
    await updateUser({ wallets });
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigation.goBack(); }, 800);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>WALLETS</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.section}>
        {wallets.map(addr => (
          <View key={addr} style={styles.walletRow}>
            <Text style={styles.walletAddr} numberOfLines={1}>
              {addr.slice(0, 6)}...{addr.slice(-6)}
            </Text>
            <TouchableOpacity onPress={() => removeWallet(addr)} style={styles.removeBtn}>
              <Text style={styles.removeText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.addRow}>
          <TextInput
            style={[styles.input, styles.addInput]}
            value={newWallet}
            onChangeText={setNewWallet}
            placeholder="Add wallet address"
            placeholderTextColor="#444"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addWallet}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, (saving || saved) && styles.saveBtnDim]}
        onPress={handleSave}
        disabled={saving || saved}
      >
        {saving
          ? <ActivityIndicator color="#000" />
          : <Text style={styles.saveBtnText}>{saved ? 'SAVED ✓' : 'SAVE'}</Text>
        }
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  title:    { color: '#555555', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },

  section: { paddingHorizontal: 24, marginBottom: 24 },

  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 12,
    color: '#FFFFFF', fontSize: 15,
    paddingHorizontal: 16, paddingVertical: 14,
  },

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
    marginHorizontal: 24, marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12, paddingVertical: 16, alignItems: 'center',
  },
  saveBtnDim:  { opacity: 0.6 },
  saveBtnText: { color: '#000000', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
});
