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

export const ProviderListTitle = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin: 20px;
`;

export const ProviderCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #3e3b47;
  margin: 0px 16px 16px;
  padding: 20px;
  border-radius: 10px;
`;

export const ProviderInfoContainer = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderAvatar = styled.Image`
  height: 72px;
  width: 72px;
  background-color: #232129;
  border-radius: 36px;
  align-self: flex-start;
`;

export const ProviderName = styled.Text`
  color: #f4ede8;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;

export const ProviderAvailabilityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const ProviderAvailabilityText = styled.Text`
  color: #999591;
  margin-left: 8px;
  font-size: 14px;
  line-height: 24px;
  font-family: 'RobotoSlab-Regular';
`;
