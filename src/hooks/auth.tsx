import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import api from '../data/api';
import { AuthDTO, UserDTO } from '../data/models/AuthDTO';
import { USER_INFO, TOKEN } from '../data/auth/authStorageConstants';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from '../utils/storage';

interface Auth {
  user: UserDTO;
  token: string;
}

interface AuthContextData {
  auth: Auth;
  isLoading: boolean;
  signIn(email: string, password: string): Promise<Auth>;
  signOut(): void;
}

const defaultValue = {} as AuthContextData;

const AuthContext = createContext(defaultValue);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC = (props: any) => {
  const [auth, setAuth] = useState<Auth>({} as Auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStorageAuthData = async () => {
      setIsLoading(true);
      const user = await getStorageItem<UserDTO>(USER_INFO);
      const token = await getStorageItem<string>(TOKEN);
      if (user && token) {
        setAuth({ user, token });
      }
      setIsLoading(false);
      return {} as Auth;
    };
    loadStorageAuthData();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await api.post<AuthDTO>('/sessions', {
      email,
      password,
    });
    const { data } = response;
    setAuth({
      user: data.user,
      token: data.token,
    });
    await setStorageItem(TOKEN, data.token);
    await setStorageItem(USER_INFO, data.user);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await removeStorageItem(TOKEN);
    await removeStorageItem(USER_INFO);
    setAuth({} as Auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, isLoading, signIn, signOut }}
      {...props}
    />
  );
};

export { useAuth, AuthProvider };
