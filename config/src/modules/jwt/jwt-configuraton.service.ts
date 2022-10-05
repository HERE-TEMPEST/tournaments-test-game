import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { JwtConfiguration } from './jwt-configuration.type';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private readonly configService: ConfigService<JwtConfiguration>,
  ) {}
  createJwtOptions(): JwtModuleOptions {
    const jwtOptions = this.configService.get('jwt');

    return jwtOptions;
  }
}
