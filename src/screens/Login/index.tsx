import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';
import Assets from '../../assets/Assets';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
  return (
    <Container>
      <Image source={Assets.Logo} />
      <Title>Faça seu logon</Title>
      <Input
        name="email"
        icon="mail"
        placeholder="Email"
        keyboardType="email-address"
      />
      <Input name="password" icon="lock" placeholder="Senha" secureTextEntry />
      <Button onPress={() => console.warn('press')}>Entrar</Button>
    </Container>
  );
};

export default Login;
