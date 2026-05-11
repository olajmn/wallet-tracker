import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { tabs } from './config/navigation';
import { UserProvider } from './context/UserContext';
import SettingsScreen from './screens/Settings/SettingsScreen';
import WalletsScreen from './screens/Settings/WalletsScreen';
import ProfileSettingsScreen from './screens/Settings/ProfileSettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D0D0D',
          borderTopColor: '#1A1A1A',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#444444',
      }}
    >
      {tabs.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Wallets" component={WalletsScreen} />
          <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
