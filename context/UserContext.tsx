import { createContext, useContext, useState } from 'react';
import { placeholderUser } from '../mock/placeholderUser';

export type UserData = {
  name:     string;
  handle:   string;
  email:    string;
  bio:      string;
  location: string;
  joined:   string;
  wallets:  string[];
};

const DEFAULT: UserData = {
  name:     placeholderUser.name,
  handle:   placeholderUser.handle,
  email:    placeholderUser.email,
  bio:      placeholderUser.bio,
  location: placeholderUser.location,
  joined:   placeholderUser.joined,
  wallets: [],
};

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

  async function updateUser(data: Partial<UserData>) {
    setUserData(prev => ({ ...prev, ...data }));
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
