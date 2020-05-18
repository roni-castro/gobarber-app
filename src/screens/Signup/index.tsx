import React, { useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import * as Yup from 'yup';
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
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import { showSnackBar } from '../../utils/snackbar';

interface SignupFormProps {
  email: string;
  password: string;
  name: string;
}

const Signup: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleOnSubmitForm = useCallback(async (data: SignupFormProps) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
      });
      await schema.validate(data, { abortEarly: false });

      showSnackBar({
        text: 'Cadastro realizado com sucesso. Você já pode fazer seu logon',
        duration: Snackbar.LENGTH_INDEFINITE,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
        return;
      }
      showSnackBar({
        text: `Erro ao cadastrar o usuário. ${error.response.data?.message}`,
        duration: Snackbar.LENGTH_INDEFINITE,
      });
    }
  }, []);

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
            <Form ref={formRef} onSubmit={handleOnSubmitForm}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
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
                textContentType="newPassword"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                  Keyboard.dismiss();
                }}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
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
