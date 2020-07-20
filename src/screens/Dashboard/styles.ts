import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #28262e;
  padding: 24px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
  color: #f4ede8;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 28px;
`;
