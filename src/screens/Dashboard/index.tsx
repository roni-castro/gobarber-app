import React, { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';
import {
  ProfileButton,
  UserAvatar,
  Container,
  Header,
  HeaderTitle,
  UserName,
} from './styles';
import { useNavigation } from '@react-navigation/native';

const Dashboard: React.FC = () => {
  const {
    auth: { user },
    signOut,
  } = useAuth();
  const { navigate } = useNavigation();

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
    </Container>
  );
};

export default Dashboard;
