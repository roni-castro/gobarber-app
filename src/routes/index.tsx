import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthRoutes from './auth';
import AppRoutes from './app';
import { useAuth } from '../hooks/auth';
import Loading from '../components/Loading';

const Routes: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {
    auth: { user },
    isLoading,
  } = useAuth();
  if (isLoading) {
    return <Loading />;
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
