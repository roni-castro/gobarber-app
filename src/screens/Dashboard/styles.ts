import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

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

export const ProviderCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #3e3b47;
  margin: 16px 16px 4px;
  padding: 16px;
  border-radius: 10px;
`;

export const ProviderInfoContainer = styled.View`
  flex: 1;
`;

export const ProviderAvatar = styled.Image`
  height: 64px;
  width: 64px;
  background-color: #232129;
  border-radius: 32px;
  margin-right: 16px;
  align-self: flex-start;
`;

export const ProviderAvailabilityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const ProviderAvailabilityIcon = styled(FeatherIcon)`
  color: #ff9000;
  margin-right: 8px;
`;

export const ProviderTitle = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 8px;
`;

export const ProviderAvailabilityText = styled.Text`
  color: #999591;
  font-size: 14px;
  line-height: 24px;
  font-family: 'RobotoSlab-Regular';
`;
