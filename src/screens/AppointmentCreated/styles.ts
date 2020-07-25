import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 30px;
`;

export const Title = styled.Text`
  margin-top: 24px;
  font-size: 32px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
  color: #f4ede8;
`;

export const Subtitle = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
  color: #999591;
`;

export const OkButton = styled(RectButton)`
  margin-top: 32px;
  padding: 12px 24px;
  border-radius: 10px;
  justify-content: center;
  background-color: #ff9000;
`;

export const OkButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #28262e;
`;
