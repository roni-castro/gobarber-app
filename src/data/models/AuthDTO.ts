import UserData from './UserData';

export interface AuthDTO {
  user: UserData;
  token: string;
}
