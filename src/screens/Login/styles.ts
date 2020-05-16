import styled from 'styled-components/native';
import { RegularText } from '../../constants/fontFamily';
import Feather from 'react-native-vector-icons/Feather';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 30px ${Platform.OS === 'android' ? 150 : 100}px 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  margin: 48px 0px 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 16px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px 0;
  border-top-width: 1px;
  border-color: #232129;
  background: #312e38;

  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const CreateAccountText = styled(RegularText)`
  font-size: 16px;
  color: #ff9000;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
  color: #ff9000;
`;
