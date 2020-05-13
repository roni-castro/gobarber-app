import styled from 'styled-components/native';
import { InputProps } from './index';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  background-color: #232129;
`;

export const TextInput = styled.TextInput.attrs<InputProps>({
  placeholderTextColor: '#666360',
})`
  flex: 1;
  font-size: 16px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;
