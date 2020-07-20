import api from '../../api';
import UserData from '../../models/UserData';

export const getProviders = async () => {
  const response = await api.get<UserData[]>('/providers');
  return response.data;
};
