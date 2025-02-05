
export const userIdStr = 'userId';
export const userNameStr = 'username';
export const jwtStr = 'jwt';

export interface Message {
  userId?: number;
  content: string;
  timestamp?: Date;
}
export interface AuthUserDTO {
  username: string;
  password: string;
}
export interface User {
  userId?: number;
  username: string;
}
