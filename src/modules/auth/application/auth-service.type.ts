import { UserModel } from '../../users';

export interface GoogleLoginParams {
  email: string;
  firstName: string;
  lastName: string;
  profileUri: string;
}
export interface GoogleLoginResult {
  accessToken: string;
}

export type GenerateTokenParams = Pick<UserModel, '_id'>;

export interface LocalRegisterParams {
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
}
export interface LocalRegisterResult {
  accessToken: string;
}

export interface LocalLoginParams {
  email: string;
}
export interface LocalLoginResult {
  accessToken: string;
}
