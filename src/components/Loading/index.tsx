import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './styles';

const Loading = memo(() => (
  <Container>
    <ActivityIndicator size={'large'} />
  </Container>
));

export default Loading;
