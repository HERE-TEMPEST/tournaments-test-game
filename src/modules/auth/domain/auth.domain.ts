import { Injectable } from '@nestjs/common';

import { UserModel, UsersService } from '../../users';
import {
  GoogleLoginParams,
  GoogleLoginResult,
  LocalLoginParams,
  LocalLoginResult,
  LocalRegistUserParams,
  LocalRegistUserResult,
} from './auth-domain.type';

@Injectable()
export class AuthDomain {
  constructor(private readonly usersService: UsersService) {}

  async loginUser(loginDto: LocalLoginParams): Promise<LocalLoginResult> {
    const { email } = loginDto;

    const user = await this.usersService.getByEmail({ email });

    if (user) {
      return user;
    }

    return this.usersService.createUser(loginDto);
  }

  async registUser(
    params: LocalRegistUserParams,
  ): Promise<LocalRegistUserResult> {
    const { email } = params;

    const user = await this.usersService.getByEmail({ email });

    if (user) {
      return this.usersService.updateUser({
        userId: user._id,
        properties: params,
      });
    }

    return this.usersService.createUser(params);
  }

  async googleLogin(params: GoogleLoginParams): Promise<GoogleLoginResult> {
    const { email, profileUri, ...parameters } = params;

    const user = await this.usersService.getByEmail({ email });

    if (user) {
      return user;
    }

    return this.usersService.createUser({
      ...parameters,
      email,
      profile: {
        key: null,
        uri: profileUri,
      },
    });
  }
}
