import styled from 'styled-components/native';
import { MediumText } from '../../constants/fontFamily';

export const Container = styled.View`
  flex: 1;
  margin-right: 40px;
  margin-left: 40px;
  align-items: center;
  justify-content: center;
  background-color: #312e38;
`;

export const Title = styled(MediumText)`
  font-size: 24px;
  color: #f4ede8;
  margin: 64px 0px 24px;
`;
