import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';
import Assets from '../../assets/Assets';

const Login: React.FC = () => {
  return (
    <Container>
      <Image source={Assets.Logo} />
      <Title>Login</Title>
    </Container>
  );
};

export default Login;
