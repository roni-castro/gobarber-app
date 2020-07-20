import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import AppointmentData from '../../data/models/AppointmentData';
import UserData from '../../data/models/UserData';
import { getProviders } from '../../data/services/providers/providers';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  UserName,
} from './styles';

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<UserData[]>([]);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const {
    auth: { user },
    signOut,
  } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    getProviders().then(providers => {
      setProviders(providers);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,{'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <FlatList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => {
          return <HeaderTitle>{provider.name}</HeaderTitle>;
        }}
      />
    </Container>
  );
};

export default Dashboard;
