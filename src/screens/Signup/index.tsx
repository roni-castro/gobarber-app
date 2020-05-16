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
  BackToLoginButton,
  BackToLoginText,
  Icon,
  Title,
} from './styles';
import { useNavigation } from '@react-navigation/native';

const Signup: React.FC = () => {
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
              <Title>Crie sua conta</Title>
            </View>
            <Input name="name" icon="user" placeholder="Nome" />
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
            <Button onPress={() => console.warn('press')}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLoginButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} />
        <BackToLoginText>Voltar para logon</BackToLoginText>
      </BackToLoginButton>
    </>
  );
};

export default Signup;
