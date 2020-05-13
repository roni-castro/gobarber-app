import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';
import Assets from '../../assets/Assets';
import Input from '../../components/Input';

const Login: React.FC = () => {
  return (
    <Container>
      <Image source={Assets.Logo} />
      <Title>Faça seu logon</Title>
      <Input name="email" icon={''} placeholder="Email" />
      <Input name="password" icon={''} placeholder="Senha" secureTextEntry />
    </Container>
  );
};

export default Login;
