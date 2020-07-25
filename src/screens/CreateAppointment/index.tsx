import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ProviderDayAvailabilityData from '../../data/models/ProviderDayAvailabilityData';
import {
  Header,
  BackButton,
  HeaderTitle,
  Container,
  ProviderAvatar,
  ProviderList,
  ProviderCard,
  ProviderCardName,
  ProviderCardAvatar,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  ScheduleTitle,
  ScheduleSection,
  ScheduleSectionTitle,
  ScheduleSectionContent,
  ScheduleHourContainer,
  ScheduleHour,
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
  hourFormatted: string;
  available: boolean;
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
  const [providerAvailabilities, setProviderAvailabilityHours] = useState<
    ProviderAvailability[]
  >([]);
  const [selectedProviderId, setSelectedProviderId] = useState(providerId);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getProviders().then(response => {
      setProviders(response);
    });
  }, []);

  useEffect(() => {
    const mapToProviderAvailability = (
      response: ProviderDayAvailabilityData[],
    ): ProviderAvailability[] => {
      return response.map(({ availability, hour }) => ({
        available: availability,
        hour,
        hourFormatted: format(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            selectedDate.getDate(),
            hour,
          ),
          'HH:mm',
        ),
      }));
    };

    getProviderDayAvailability({
      userId: selectedProviderId,
      day: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    }).then(response => {
      const availabilities = mapToProviderAvailability(response);
      setProviderAvailabilityHours(availabilities);
      setSelectedHour(null);
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

  const handleSelectedHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const morningAvailabilities = useMemo(() => {
    return providerAvailabilities.filter(({ hour }) => hour < 12);
  }, [providerAvailabilities]);

  const afternoonAvailabilities = useMemo(() => {
    return providerAvailabilities.filter(({ hour }) => hour >= 12);
  }, [providerAvailabilities]);

  return (
    <>
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
      <Container>
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
        <Schedule>
          <ScheduleTitle>Escolha o horário</ScheduleTitle>
          <ScheduleSection>
            <ScheduleSectionTitle>Manhã</ScheduleSectionTitle>
            <ScheduleSectionContent>
              {morningAvailabilities.map(
                ({ hour, hourFormatted, available }) => (
                  <ScheduleHourContainer
                    enabled={available}
                    selected={hour === selectedHour}
                    available={available}
                    key={hourFormatted}
                    onPress={() => handleSelectedHour(hour)}
                  >
                    <ScheduleHour selected={hour === selectedHour}>
                      {hourFormatted}
                    </ScheduleHour>
                  </ScheduleHourContainer>
                ),
              )}
            </ScheduleSectionContent>
          </ScheduleSection>
        </Schedule>
        <ScheduleSection>
          <ScheduleSectionTitle>Tarde</ScheduleSectionTitle>
          <ScheduleSectionContent>
            {afternoonAvailabilities.map(
              ({ hour, hourFormatted, available }) => (
                <ScheduleHourContainer
                  enabled={available}
                  selected={hour === selectedHour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectedHour(hour)}
                >
                  <ScheduleHour selected={hour === selectedHour}>
                    {hourFormatted}
                  </ScheduleHour>
                </ScheduleHourContainer>
              ),
            )}
          </ScheduleSectionContent>
        </ScheduleSection>
      </Container>
    </>
  );
};

export default CreateAppointment;
