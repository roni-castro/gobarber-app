import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  ProviderAvatar,
} from './styles';

const CreateAppointment: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackButton>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabelereiros</HeaderTitle>
        <ProviderAvatar
          source={{
            uri: 'https://avatars3.githubusercontent.com/u/24610813?v=4',
          }}
        />
      </Header>
    </Container>
  );
};

export default CreateAppointment;
