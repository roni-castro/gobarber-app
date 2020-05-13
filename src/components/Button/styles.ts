import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  padding: 16px;
  background-color: #ff9000;
  border-radius: 10px;
  margin-top: 8px;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
`;
