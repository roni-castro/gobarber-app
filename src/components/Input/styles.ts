import FeatherIcon from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';

interface InputProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored?: boolean;
}

export const Container = styled.View<InputProps>`
  width: 100%;
  height: 60px;
  padding-left: 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  background-color: #232129;
  border-width: 2px;
  border-color: #232129;

  ${props =>
    props.isErrored &&
    css`
      border-width: 2px;
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-width: 2px;
      border-color: #ff9000;
    `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs<InputProps>({
  placeholderTextColor: '#666360',
})`
  flex: 1;
  font-size: 16px;
  color: #fff;
  height: 100%;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)<InputProps>`
  ${props =>
    props.isFilled || props.isFocused
      ? css`
          color: #ff9000;
        `
      : css`
          color: #666360;
        `}
  margin-right: 12px;
`;
