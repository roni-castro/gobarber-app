import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import ProviderDayAvailabilityData from '../../data/models/ProviderDayAvailabilityData';
import {
  Header,
  BackButton,
  HeaderTitle,
  Container,
  ProviderAvatar,
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
  SelectedDateText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import { getProviders } from '../../data/services/providers/providers';
import { useAuth } from '../../hooks/auth';
import { getProviderDayAvailability } from '../../data/services/providers/providerDayAvailalbility';
import { createAppointment } from '../../data/services/appointments/createAppointments';
import { showSnackBar } from '../../utils/snackbar';
import { RenderController } from '../../components/RenderController';
import {
  initialState,
  listAvailabilityReducer,
} from '../../reducers/listAvailabilityReducer';
import * as actions from '../../actions/listAvaialbilityActionTypes';

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
  const [
    { isLoading, error, data: providerAvailabilities },
    dispatch,
  ] = useReducer(listAvailabilityReducer, initialState);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [provider, setProvider] = useState<Provider | undefined>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getProviders().then(response => {
      const providerFound = response.find(p => p.id === providerId);
      setProvider(providerFound);
    });
  }, [providerId]);

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

    dispatch({ type: actions.ListAvailabilityLoading });
    getProviderDayAvailability({
      userId: providerId,
      day: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    })
      .then(response => {
        const availabilities = mapToProviderAvailability(response);
        dispatch({
          type: actions.ListAvailabilitySuccess,
          data: availabilities,
        });
        setSelectedHour(null);
      })
      .catch(err => {
        dispatch({ type: actions.ListAvailabilityError, error: err });
      });
  }, [selectedDate, providerId]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

  const handleCreateAppointment = useCallback(async () => {
    if (!selectedHour) {
      return;
    }
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour, 0, 0, 0);
      await createAppointment({
        provider_id: providerId,
        date,
      });
      navigation.reset({
        routes: [
          { name: 'Dashboard' },
          {
            name: 'AppointmentCreated',
            params: {
              date: date.getTime(),
              providerName: provider?.name,
            },
          },
        ],
        index: 1,
      });
    } catch (err) {
      showSnackBar({
        text: `Erro ao criar agendamento: ${err?.response?.data?.message}`,
      });
    }
  }, [navigation, providerId, selectedHour, selectedDate, provider]);

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
      <RenderController
        hasData={!!provider && providerAvailabilities.length > 0}
        loading={isLoading}
        error={!!error}
      >
        <RenderController.StateLoading>
          <LoadingIndicator />
        </RenderController.StateLoading>
        <Container>
          {provider && (
            <ProviderCard isSelected={provider.id === providerId}>
              <ProviderCardAvatar
                source={{
                  uri: provider.avatar_url || undefined,
                }}
              />
              <ProviderCardName
                isSelected={provider.id === providerId}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {provider.name}
              </ProviderCardName>
            </ProviderCard>
          )}
          <Calendar>
            <CalendarTitle>Escolha a data</CalendarTitle>
            <OpenDatePickerButton onPress={handleDatePickerToogle}>
              <OpenDatePickerText>
                <SelectedDateText>
                  {`${format(selectedDate, 'dd/MM/yyyy')}`}
                </SelectedDateText>
              </OpenDatePickerText>
            </OpenDatePickerButton>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={selectedDate}
                onChange={handleDateChange}
                textColor="#f4ede8"
                minimumDate={new Date()}
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
          <CreateAppointmentButton
            enabled={!!selectedHour}
            onPress={handleCreateAppointment}
          >
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        </Container>
      </RenderController>
    </>
  );
};

export default CreateAppointment;
