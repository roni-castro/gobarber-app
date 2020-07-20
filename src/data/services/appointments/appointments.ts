import api from '../../api';
import AppointmentData from '../../models/AppointmentData';

export const getAppointments = async () => {
  const response = await api.get<AppointmentData[]>('/appointments');
  return response.data;
};
