import React from 'react';
import { Icon, NavigationButton, NavigationButtonText } from './styles';

interface ButtonNavigationProps {
  onPress: () => void;
  iconName?: string;
  text: string;
}

const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  onPress,
  iconName,
  text,
}) => {
  return (
    <NavigationButton onPress={onPress}>
      <Icon name={iconName || 'arrow-left'} size={20} />
      <NavigationButtonText>{text}</NavigationButtonText>
    </NavigationButton>
  );
};

export default ButtonNavigation;
