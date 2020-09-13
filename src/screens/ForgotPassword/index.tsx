import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Assets from '../../assets/Assets';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Title } from './styles';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import { showSnackBar } from '../../utils/snackbar';
import { forgotPassword } from '../../data/services/user/forgotPassword';
import ButtonNavigation from '../../components/ButtonNavigation';

interface ForgotPasswordFormProps {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleOnSubmitForm = useCallback(
    async (data: ForgotPasswordFormProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, { abortEarly: false });
        await forgotPassword(data.email);
        showSnackBar({
          text: `Enviamos um email para confirmar a recuperação de senha, verifique sua caixa de entrada!`,
        });
        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
          return;
        }
        showSnackBar({
          text: `Ocorreu um erro na recuperação da senha. Tente novamente! ${error.message}`,
        });
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            <Image source={Assets.Logo} />
            <View>
              <Title>Recuperar senha</Title>
            </View>
            <Form ref={formRef} onSubmit={handleOnSubmitForm}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="send"
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Recuperar
              </Button>
            </Form>
          </Container>
          <ButtonNavigation
            onPress={() => navigation.goBack()}
            text="Voltar para logon"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPassword;
