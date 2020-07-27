import React, { useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import {
  TextInput,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  ContentContainer,
  Header,
  BackButton,
  CameraButton,
  Avatar,
  ProfileContainer,
  LogoutButton,
  LogoutText,
  FormContent,
  FormTitle,
} from './styles';
import Input from '../../components/Input';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import Button from '../../components/Button';

interface InputData {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const {
    auth: { user },
    signOut,
  } = useAuth();
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleOnSubmitProfileForm = useCallback(async (data: InputData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        oldPassword: Yup.string(),
        password: Yup.string().when('oldPassword', {
          is: val => !!val.length,
          then: Yup.string().required('Senha atual é necessária'),
          otherwise: Yup.string(),
        }),
        passwordConfirmation: Yup.string()
          .when('oldPassword', {
            is: val => !!val.length,
            then: Yup.string().required('Senha de confirmação é necessária'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais'),
      });
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
      }
    }
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Header>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <LogoutButton onPress={signOut}>
              <LogoutText>Sair</LogoutText>
            </LogoutButton>
          </Header>
          <ContentContainer>
            <ProfileContainer>
              <Avatar source={{ uri: user.avatar_url || undefined }} />
              <CameraButton>
                <Icon name="camera" size={24} color="#28262e" />
              </CameraButton>
            </ProfileContainer>
            <FormContent>
              <FormTitle>Meu perfil</FormTitle>
              <Form onSubmit={handleOnSubmitProfileForm}>
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
                    oldPasswordInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={oldPasswordInputRef}
                  containerStyle={{ marginTop: 24 }}
                  secureTextEntry
                  name="oldPassword"
                  icon="lock"
                  placeholder="Senha atual"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={passwordInputRef}
                  secureTextEntry
                  name="password"
                  icon="lock"
                  placeholder="Nova senha"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordConfirmationInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={passwordConfirmationInputRef}
                  secureTextEntry
                  name="passwordConfirmation"
                  icon="lock"
                  placeholder="Confirmar senha"
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                    Keyboard.dismiss();
                  }}
                />
                <Button onPress={() => formRef.current?.submitForm()}>
                  Confirmar mudanças
                </Button>
              </Form>
            </FormContent>
          </ContentContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
