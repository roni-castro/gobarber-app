import React from 'react';
import { render } from '@testing-library/react-native';
import Login from '../../screens/Login';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('Login Screen', () => {
  it('should contains email and password inputs', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Senha');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
});
