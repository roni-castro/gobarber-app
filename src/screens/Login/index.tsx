import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
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
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import { showSnackBar } from '../../utils/snackbar';
import { useAuth } from '../../hooks/auth';

interface LoginFormProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();

  const handleOnSubmitForm = useCallback(
    async (data: LoginFormProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        await signIn(data.email, data.password);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
          return;
        }
        showSnackBar({
          text: `Erro ao fazer login. Verifique se o email ou senha estão corretos`,
        });
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        {...Platform.select({ ios: { behavior: 'padding' } })}
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
            <Form ref={formRef} onSubmit={handleOnSubmitForm}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
            <ForgotPasswordButton
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPasswordButton>
          </Container>
          <CreateAccountButton onPress={() => navigation.navigate('Signup')}>
            <Icon name="log-in" size={20} />
            <CreateAccountText>Criar conta</CreateAccountText>
          </CreateAccountButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
