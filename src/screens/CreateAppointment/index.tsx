import React, { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  ProviderAvatar,
  ProviderList,
  ProviderCard,
  ProviderCardName,
  ProviderCardAvatar,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerText,
} from './styles';
import { getProviders } from '../../data/services/providers/providers';
import { useAuth } from '../../hooks/auth';
import { getProviderDayAvailability } from '../../data/services/providers/providerDayAvailalbility';

export interface Provider {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

export interface ProviderAvailability {
  hour: number;
  availability: boolean;
}

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const {
    auth: { user },
  } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;
  const [providerAvailability, setProviderAvailability] = useState<
    ProviderAvailability[]
  >([]);
  const [selectedProviderId, setSelectedProviderId] = useState(providerId);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getProviders().then(response => {
      setProviders(response);
    });
  }, []);

  useEffect(() => {
    getProviderDayAvailability({
      userId: selectedProviderId,
      day: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    }).then(response => {
      setProviderAvailability(response);
    });
  }, [selectedDate, selectedProviderId]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleProviderSelected = useCallback((providerIdSelected: string) => {
    setSelectedProviderId(providerIdSelected);
  }, []);

  const handleDateChange = useCallback((event: any, newDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (newDate) {
      setSelectedDate(newDate);
    }
  }, []);

  const handleDatePickerToogle = useCallback(() => {
    setShowDatePicker(prevShowDatePicker => !prevShowDatePicker);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabelereiros</HeaderTitle>
        <ProviderAvatar
          source={{
            uri: user.avatar_url || undefined,
          }}
        />
      </Header>
      <ProviderList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={providers}
        keyExtractor={item => item.id}
        renderItem={({ item: provider }) => (
          <ProviderCard
            isSelected={provider.id === selectedProviderId}
            onPress={() => handleProviderSelected(provider.id)}
          >
            <ProviderCardAvatar
              source={{
                uri: provider.avatar_url || undefined,
              }}
            />
            <ProviderCardName
              isSelected={provider.id === selectedProviderId}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {provider.name}
            </ProviderCardName>
          </ProviderCard>
        )}
      />
      <Calendar>
        <CalendarTitle>Escolha a data</CalendarTitle>
        <OpenDatePickerButton onPress={handleDatePickerToogle}>
          <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
        </OpenDatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={selectedDate}
            onChange={handleDateChange}
            textColor="#f4ede8"
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
