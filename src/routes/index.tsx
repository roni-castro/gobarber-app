import React from 'react';
import AuthRoutes from './auth';
import AppRoutes from './app';
import { useAuth } from '../hooks/auth';
import Loading from '../components/Loading';

const Routes: React.FC = () => {
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
