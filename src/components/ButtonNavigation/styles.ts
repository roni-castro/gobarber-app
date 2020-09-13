import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Feather from 'react-native-vector-icons/Feather';
import { RegularText } from '../../constants/fontFamily';

export const NavigationButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px 0;
  border-top-width: 1px;
  border-color: #232129;
  background: #312e38;

  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const NavigationButtonText = styled(RegularText)`
  font-size: 16px;
  color: #f4ede8;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
  color: #f4ede8;
`;
