import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import AuthRoutes from './routes';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" />
      <AuthRoutes />
    </NavigationContainer>
  );
};

export default App;
