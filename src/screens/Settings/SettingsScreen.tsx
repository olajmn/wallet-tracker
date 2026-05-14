import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { shared } from '../../styles/shared';
import { styles } from './SettingsScreen.styles';

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={shared.container}>

      <View style={shared.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={shared.backBtn}>
          <Text style={shared.backText}>←</Text>
        </TouchableOpacity>
        <Text style={shared.title}>SETTINGS</Text>
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
