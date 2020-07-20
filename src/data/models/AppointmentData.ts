import UserData from './UserData';

export default interface AppointmentData {
  id: string;
  date: string;
  client: UserData;
}
