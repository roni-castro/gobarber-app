import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Dashboard from '../screens/Dashboard';
import CreateAppointment from '../screens/CreateAppointment';
import AppointmentCreated from '../screens/AppointmentCreated';
import Profile from '../screens/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#28262e' }}>
      <StatusBar backgroundColor="#28262e" />
      <App.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#312e38',
          },
        }}
      >
        <App.Screen name="Dashboard" component={Dashboard} />
        <App.Screen name="CreateAppointment" component={CreateAppointment} />
        <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

        <App.Screen name="Profile" component={Profile} />
      </App.Navigator>
    </SafeAreaView>
  );
};

export default AppRoutes;
