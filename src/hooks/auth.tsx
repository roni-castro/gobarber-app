import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import api from '../data/api';
import { AuthDTO } from '../data/models/AuthDTO';
import UserData from '../data/models/UserData';
import { USER_INFO, TOKEN } from '../data/auth/authStorageConstants';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from '../utils/storage';
import { updateUserInfo, updateAvatar } from '../data/services/user/profile';
import EventPublisher from '../utils/eventPublisher';

interface Auth {
  user: UserData;
  token: string;
}
interface UpdateUserInfoParams {
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

interface AuthContextData {
  auth: Auth;
  isLoading: boolean;
  signIn(email: string, password: string): Promise<Auth>;
  signOut(): void;
  updateUserProfile(data: UpdateUserInfoParams): Promise<void>;
  updateUserAvatar(formData: FormData): Promise<void>;
}
const defaultValue = {} as AuthContextData;

const AuthContext = createContext(defaultValue);

const useAuth = (): AuthContextData => {
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
      const user = await getStorageItem<UserData>(USER_INFO);
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

  const updateUserAvatar = useCallback(async (formData: FormData) => {
    const user = await updateAvatar(formData);
    setStorageItem(USER_INFO, user);
    setAuth(preAuth => ({
      ...preAuth,
      user,
    }));
  }, []);

  const updateUserProfile = useCallback(async (data: UpdateUserInfoParams) => {
    const user = await updateUserInfo(data);
    setStorageItem(USER_INFO, user);
    setAuth(prevAuth => ({
      ...prevAuth,
      user,
    }));
  }, []);

  useEffect(() => {
    EventPublisher.instance = new EventPublisher(['TOKEN_EXPIRED']);
    const subscription = EventPublisher.instance.subscribe(
      'TOKEN_EXPIRED',
      () => {
        signOut();
      },
    );
    return () => subscription();
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        signIn,
        signOut,
        updateUserProfile,
        updateUserAvatar,
      }}
      {...props}
    />
  );
};

export { useAuth, AuthProvider };
