import React from 'react';
import { render } from 'react-native-testing-library';
import Login from '../../screens/Login';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('Login Screen', () => {
  it('should contains email and password inputs', () => {
    const { getByPlaceholder } = render(<Login />);
    const emailInput = getByPlaceholder('Email');
    const passwordInput = getByPlaceholder('Senha');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
});
