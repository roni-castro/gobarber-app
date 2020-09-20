import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import codePush from 'react-native-code-push';
import AuthRoutes from './routes';
import AppProvider from './hooks/AppProvider';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" />
      <AppProvider>
        <AuthRoutes />
      </AppProvider>
    </NavigationContainer>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};
export default codePush(codePushOptions)(App);
