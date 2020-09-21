import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { IndicatorContainer } from './style';

export const LoadingIndicator = memo(() => (
  <IndicatorContainer>
    <ActivityIndicator size={48} color="#FF9000" />
  </IndicatorContainer>
));
