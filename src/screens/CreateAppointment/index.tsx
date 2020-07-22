import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
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
} from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getProviders } from '../../data/services/providers/providers';
import { useAuth } from '../../hooks/auth';

export interface Provider {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
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
  const [selectedProviderId, setSelectedProviderId] = useState(providerId);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    getProviders().then(providers => {
      setProviders(providers);
    });
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleProviderSelected = useCallback((providerId: string) => {
    setSelectedProviderId(providerId);
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
    </Container>
  );
};

export default CreateAppointment;
