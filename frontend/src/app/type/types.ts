
export interface Message {
  userId?: number;
  content: string;
  timestamp?: Date;
}
export interface AuthUserDTO {
  username: string;
  password: string;
}
