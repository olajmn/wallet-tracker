import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { shared } from '../../styles/shared';
import { styles } from './ProfileSettingsScreen.styles';

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
    <ScrollView style={shared.container} contentContainerStyle={shared.content} keyboardShouldPersistTaps="handled">

      <View style={shared.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={shared.backBtn}>
          <Text style={shared.backText}>←</Text>
        </TouchableOpacity>
        <Text style={shared.title}>PROFILE</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={shared.section}>
        <Text style={styles.label}>NAME</Text>
        <TextInput style={shared.input} value={name} onChangeText={setName}
          placeholder="Your name" placeholderTextColor="#444" autoCorrect={false} />
      </View>

      <View style={shared.section}>
        <Text style={styles.label}>HANDLE</Text>
        <View style={styles.handleRow}>
          <Text style={styles.at}>@</Text>
          <TextInput style={[shared.input, { flex: 1 }]} value={handle} onChangeText={setHandle}
            placeholder="username" placeholderTextColor="#444"
            autoCapitalize="none" autoCorrect={false} />
        </View>
      </View>

      <View style={shared.section}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput style={shared.input} value={email} onChangeText={setEmail}
          placeholder="your@email.com" placeholderTextColor="#444"
          autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
      </View>

      <View style={shared.section}>
        <Text style={styles.label}>BIO</Text>
        <TextInput style={[shared.input, styles.bioInput]} value={bio} onChangeText={setBio}
          placeholder="Tell us about yourself" placeholderTextColor="#444"
          multiline autoCorrect={false} />
      </View>

      <View style={shared.section}>
        <Text style={styles.label}>LOCATION</Text>
        <TextInput style={shared.input} value={location} onChangeText={setLocation}
          placeholder="Oslo, Norway" placeholderTextColor="#444" autoCorrect={false} />
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
