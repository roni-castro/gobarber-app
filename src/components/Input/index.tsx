import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput } from './styles';

export interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      {/* <Image source={{}} /> */}
      <TextInput keyboardAppearance="dark" {...rest} />
    </Container>
  );
};

export default Input;
