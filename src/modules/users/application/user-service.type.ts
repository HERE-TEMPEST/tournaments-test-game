import { Types } from 'mongoose';
import { UserModel } from '../domain';

export type CreateUserParams = Partial<Omit<UserModel, '_id'>>;

export interface UpdateUserParams {
  userId: string | Types.ObjectId;
  properties: {
    email?: string;
    firstName?: string;
    lastName?: string;
    nickName?: string;
  };
}

export interface UpdateProfileParams {
  userId: string;
  profile: Express.Multer.File;
}
export interface UpdateProfileResult {
  key: string;
  uri: string;
}

export interface GetProfileParams {
  userId: string;
}
export interface GetProfileResult {
  key: string;
  uri: string;
}

export interface GetByEmailParams {
  email: string;
}

export interface GetByIdParams {
  userId: string;
}

export interface GetUserInfoParams {
  userId: string;
}
