import React from 'react';
import { Text, Image } from 'react-native';
import { Container } from './styles';
import Assets from '../../assets/Assets';

const Login: React.FC = () => {
  return (
    <Container>
      <Image source={Assets.Logo} />
      <Text>Login</Text>
    </Container>
  );
};

export default Login;
