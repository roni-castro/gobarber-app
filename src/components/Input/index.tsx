import React, { useRef, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';
import { useField } from '@unform/core';
export interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      setValue(ref: any, value) {
        inputElementRef.current?.setNativeProps({ text: value });
        inputValueRef.current.value = value;
      },

      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, inputValueRef, inputElementRef]);

  return (
    <Container>
      {icon && <Icon name={icon} size={20} color="#666360" />}
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
