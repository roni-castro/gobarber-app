export interface AuthDTO {
  user: UserDTO;
  token: string;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}
