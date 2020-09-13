import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 30px ${Platform.OS === 'android' ? 120 : 100}px 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  margin: 48px 0px 24px;
  font-family: 'RobotoSlab-Medium';
`;
