import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px;
  background-color: #28262e;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  line-height: 28px;
  color: #f4ede8;
  margin-left: 8px;
`;

export const ProviderAvatar = styled.Image`
  width: 58px;
  height: 58px;
  border-radius: 29px;
  margin-left: 10px;
  background-color: red;
`;
