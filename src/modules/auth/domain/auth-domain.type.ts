import { UserModel } from '../../users/domain';

export interface GoogleLoginParams {
  email: string;
  firstName: string;
  lastName: string;
  profileUri: string;
}
export type GoogleLoginResult = UserModel;

export interface LocalRegistUserParams {
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
}
export type LocalRegistUserResult = UserModel;

export interface LocalLoginParams {
  email: string;
}
export type LocalLoginResult = UserModel;
