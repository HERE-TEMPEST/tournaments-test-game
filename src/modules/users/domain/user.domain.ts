import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '../infrastructure';
import { IUserRepository } from './interfaces';
import { UserModel } from './models';
import { CreateUserParams } from './user-domain.type';

@Injectable()
export class UserDomain {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(params: CreateUserParams): Promise<Omit<UserModel, '_id'>> {
    const { email, firstName, lastName, nickName, profile } = params;

    // some rules

    return {
      email,
      firstName,
      lastName,
      nickName,
      profile,
    };
  }
}
