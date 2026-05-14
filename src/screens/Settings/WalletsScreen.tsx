import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { shared } from '../../styles/shared';
import { styles } from './WalletsScreen.styles';

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
    <ScrollView style={shared.container} contentContainerStyle={shared.content} keyboardShouldPersistTaps="handled">

      <View style={shared.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={shared.backBtn}>
          <Text style={shared.backText}>←</Text>
        </TouchableOpacity>
        <Text style={shared.title}>WALLETS</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={shared.section}>
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
            style={[shared.input, styles.addInput]}
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
        style={[shared.saveBtn, (saving || saved) && shared.saveBtnDim]}
        onPress={handleSave}
        disabled={saving || saved}
      >
        {saving
          ? <ActivityIndicator color="#000" />
          : <Text style={shared.saveBtnText}>{saved ? 'SAVED ✓' : 'SAVE'}</Text>
        }
      </TouchableOpacity>

    </ScrollView>
  );
}
