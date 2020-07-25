import React, { useMemo, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, Title, Subtitle, OkButton, OkButtonText } from './styles';

interface RouteParams {
  date: number;
  providerName: string;
}

const AppointmentCreated: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date: dateTimestamp, providerName } = route.params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(
      new Date(dateTimestamp),
      "EEEE', dia' dd 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );
  }, [dateTimestamp]);

  const handleOkPressed = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [navigation]);

  return (
    <Container>
      <Icon name="check" size={80} color="#32CD32" />
      <Title>Agendamento concluído</Title>
      <Subtitle>{`${formattedDate}, com ${providerName}`}</Subtitle>
      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
