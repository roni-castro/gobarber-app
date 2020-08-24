import styled from 'styled-components/native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderCardProps {
  isSelected: boolean;
}

interface ProviderCardNameProps {
  isSelected: boolean;
}
interface ScheduleHourProps {
  available: boolean;
  selected: boolean;
}

interface ScheduleHourTextProps {
  selected: boolean;
}

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

export const Container = styled.ScrollView``;

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 16px 16px;
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
  margin: 24px 16px;
`;

export const OpenDatePickerButton = styled.TouchableOpacity`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: #ff9000;
  margin: 0px 16px 24px;
  padding: 16px;
`;

export const OpenDatePickerText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #28262e;
`;

export const SelectedDateText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  text-align: center;
  margin: 0px 16px 16px;
`;

export const Schedule = styled.View``;

export const ScheduleTitle = styled.Text`
  margin: 0px 16px 16px;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const ScheduleSection = styled.View`
  margin-bottom: 0px;
`;

export const ScheduleSectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const ScheduleSectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0px 16px;
`;

export const ScheduleHourContainer = styled(RectButton)<ScheduleHourProps>`
  padding: 12px;
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
  background-color: ${props => (props.selected ? '#FF9000' : '#3e3b47')};
`;

export const ScheduleHour = styled.Text<ScheduleHourTextProps>`
  font-size: 16px;
  color: ${props => (props.selected ? '#28262e' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
`;

export const CreateAppointmentButton = styled(RectButton)`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${props => (props.enabled ? '#ff9000' : '#3e3b47')};
  margin: 0px 16px 24px;
  padding: 16px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #28262e;
`;
