import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderCardProps {
  isSelected: boolean;
}

interface ProviderCardNameProps {
  isSelected: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  color: #f4ede8;
  margin-left: 8px;
`;

export const ProviderAvatar = styled.Image`
  width: 58px;
  height: 58px;
  border-radius: 29px;
  margin-left: auto;
`;

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderCard = styled.TouchableOpacity<ProviderCardProps>`
  flex: 1;
  max-width: 250px;
  flex-direction: row;
  align-items: center;
  background-color: ${props => (props.isSelected ? '#FF9000' : '#28262e')};
  border-radius: 10px;
  padding: 16px;
  margin-right: 16px;
`;

export const ProviderCardAvatar = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: #f4ede8;
`;

export const ProviderCardName = styled.Text<ProviderCardNameProps>`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: ${props => (props.isSelected ? '#232129' : '#f4ede8')};
  margin-left: 10px;
  margin-right: 10px;
`;

export const Calendar = styled.View``;

export const CalendarTitle = styled.Text`
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  margin: 0px 24px 24px;
`;

export const OpenDatePickerButton = styled.TouchableOpacity`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: #ff9000;
  margin: 0px 24px 24px;
  padding: 16px;
`;

export const OpenDatePickerText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;
