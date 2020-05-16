import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import Assets from '../../assets/Assets';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  Container,
  CreateAccountButton,
  CreateAccountText,
  ForgotPasswordButton,
  ForgotPasswordText,
  Icon,
  Title,
} from './styles';
import { useNavigation } from '@react-navigation/native';

const Login: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            <Image source={Assets.Logo} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Input
              name="email"
              icon="mail"
              placeholder="Email"
              keyboardType="email-address"
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
            />
            <Button onPress={() => console.warn('press')}>Entrar</Button>
            <ForgotPasswordButton onPress={() => console.warn('forgot')}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPasswordButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('Signup')}>
        <Icon name="log-in" size={20} />
        <CreateAccountText>Criar conta</CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export default Login;
