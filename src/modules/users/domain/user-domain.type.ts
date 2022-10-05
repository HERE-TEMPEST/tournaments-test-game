import { UserModel } from './models';

export type CreateUserParams = Partial<Omit<UserModel, '_id'>>;
