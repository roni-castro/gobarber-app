import api from '../../api';

export const forgotPassword = (email: string): Promise<void> => {
  return api.post('/password/forgot', { email });
};
