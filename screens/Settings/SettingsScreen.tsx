import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SETTINGS</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Wallets' as never)}>
          <Text style={styles.rowLabel}>Wallets</Text>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ProfileSettings' as never)}>
          <Text style={styles.rowLabel}>Profile</Text>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },

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

  menu: {
    marginHorizontal: 24,
    backgroundColor: '#1A1A1A',
    borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  rowLabel: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
  rowArrow: { color: '#444444', fontSize: 18 },
  divider:  { height: 1, backgroundColor: '#2A2A2A', marginHorizontal: 20 },
});
