import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export type UserData = {
  wallets: string[];
};

const DEFAULT: UserData = {
  wallets: [],
};

const STORAGE_KEY = 'userData';

type UserContextType = {
  userData:   UserData;
  updateUser: (data: Partial<UserData>) => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  userData:   DEFAULT,
  updateUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(DEFAULT);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) setUserData(JSON.parse(raw));
    });
  }, []);

  async function updateUser(data: Partial<UserData>) {
    const updated = { ...userData, ...data };
    setUserData(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
