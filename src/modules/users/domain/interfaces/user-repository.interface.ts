import { UserModel } from '../models';

export interface IUserRepository {
  findByEmail(params: FindByEmailParams): Promise<UserModel | null>;
}

export interface FindByEmailParams {
  email: string;
}
