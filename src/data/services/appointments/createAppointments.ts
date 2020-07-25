import api from '../../api';
import AppointmentData from '../../models/AppointmentData';

interface CreateAppointmentBody {
  provider_id: string;
  date: Date;
}
export const createAppointment = async (
  body: CreateAppointmentBody,
): Promise<AppointmentData[]> => {
  const response = await api.post<AppointmentData[]>('/appointments', body);
  return response.data;
};
