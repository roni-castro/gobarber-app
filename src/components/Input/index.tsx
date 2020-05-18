import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
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

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    setIsFilled(!!inputValueRef.current.value);
  });

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

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {icon && (
        <Icon name={icon} size={20} isFilled={isFilled} isFocused={isFocused} />
      )}
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
