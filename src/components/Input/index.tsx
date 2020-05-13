import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';
export interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      {icon && <Icon name={icon} size={20} color="#666360" />}
      <TextInput keyboardAppearance="dark" {...rest} />
    </Container>
  );
};

export default Input;
