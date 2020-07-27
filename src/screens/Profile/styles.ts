import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  margin: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  font-size: 12px;
  color: #f4ede8;
`;

export const LogoutButton = styled.TouchableOpacity``;

export const LogoutText = styled.Text`
  font-size: 16px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileContainer = styled.View`
  width: 180px;
  position: relative;
`;

export const Avatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const CameraButton = styled(RectButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #ff9000;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  align-items: center;
`;

export const FormContent = styled.View`
  width: 100%;
`;

export const FormTitle = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  margin: 48px 0px 24px;
  font-family: 'RobotoSlab-Medium';
`;
