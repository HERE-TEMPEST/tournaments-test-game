import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Configuration } from '@tournaments/config';
import { JwtPayload } from '@tournaments/auth';

import { AuthDomain } from '../domain';
import {
  GenerateTokenParams,
  GoogleLoginParams,
  GoogleLoginResult,
  LocalLoginParams,
  LocalLoginResult,
  LocalRegisterParams,
  LocalRegisterResult,
} from './auth-service.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDomainModel: AuthDomain,
    private readonly configService: ConfigService<Configuration>,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: LocalLoginParams): Promise<LocalLoginResult> {
    const user = await this.authDomainModel.loginUser(params);

    const accessToken = await this.generateToken(user);

    return {
      accessToken,
    };
  }

  async registerUser(
    params: LocalRegisterParams,
  ): Promise<LocalRegisterResult> {
    const user = await this.authDomainModel.registUser(params);

    const accessToken = await this.generateToken(user);

    return {
      accessToken,
    };
  }

  async googleLogin(params: GoogleLoginParams): Promise<GoogleLoginResult> {
    const user = await this.authDomainModel.googleLogin(params);

    const accessToken = await this.generateToken(user);

    return {
      accessToken,
    };
  }

  private async generateToken(params: GenerateTokenParams): Promise<string> {
    const { _id } = params;

    const { accessTokenExpiresIn } = this.configService.get('jwt');

    const payload: JwtPayload = { userId: String(_id) };

    return this.jwtService.signAsync(payload, {
      expiresIn: accessTokenExpiresIn,
    });
  }
}
