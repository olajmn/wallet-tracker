import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

export default function ProfileSettingsScreen() {
  const navigation = useNavigation();
  const { userData, updateUser } = useUser();

  const [name, setName]         = useState(userData.name);
  const [handle, setHandle]     = useState(userData.handle.replace('@', ''));
  const [email, setEmail]       = useState(userData.email);
  const [bio, setBio]           = useState(userData.bio);
  const [location, setLocation] = useState(userData.location);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  async function handleSave() {
    setSaving(true);
    await updateUser({
      name:     name.trim(),
      handle:   `@${handle.trim().replace('@', '')}`,
      email:    email.trim(),
      bio:      bio.trim(),
      location: location.trim(),
    });
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
        <Text style={styles.title}>PROFIL</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>NAME</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName}
          placeholder="Your name" placeholderTextColor="#444" autoCorrect={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>HANDLE</Text>
        <View style={styles.handleRow}>
          <Text style={styles.at}>@</Text>
          <TextInput style={[styles.input, { flex: 1 }]} value={handle} onChangeText={setHandle}
            placeholder="username" placeholderTextColor="#444"
            autoCapitalize="none" autoCorrect={false} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail}
          placeholder="din@email.com" placeholderTextColor="#444"
          autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>BIO</Text>
        <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio}
          placeholder="Tell us about yourself" placeholderTextColor="#444"
          multiline autoCorrect={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>LOCATION</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation}
          placeholder="Oslo, Norway" placeholderTextColor="#444" autoCorrect={false} />
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
  label:   { color: '#444444', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },

  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 12, color: '#FFFFFF', fontSize: 15,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  bioInput:  { minHeight: 90, textAlignVertical: 'top' },
  handleRow: { flexDirection: 'row', alignItems: 'center' },
  at:        { color: '#555555', fontSize: 15, fontWeight: '700', marginRight: 8 },

  saveBtn: {
    marginHorizontal: 24, marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12, paddingVertical: 16, alignItems: 'center',
  },
  saveBtnDim:  { opacity: 0.6 },
  saveBtnText: { color: '#000000', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
});
