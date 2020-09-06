import api from '../../api';
import ProviderDayAvailabilityData from '../../models/ProviderDayAvailabilityData';

interface AppointmentParams {
  day: number;
  month: number;
  year: number;
}

interface ProviderDayAvailabilityDTO {
  userId: string;
  day: number;
  month: number;
  year: number;
}

export const getProviderDayAvailability = async (
  params: ProviderDayAvailabilityDTO,
): Promise<ProviderDayAvailabilityData[]> => {
  const { userId, day, month, year } = params;
  const response = await api.get<ProviderDayAvailabilityData[]>(
    `/providers/${userId}/day-availability`,
    {
      params: {
        day,
        month,
        year,
      } as AppointmentParams,
    },
  );
  return response.data;
};
