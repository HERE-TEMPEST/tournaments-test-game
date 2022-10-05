import { JwtModuleOptions } from '@nestjs/jwt';

export interface JwtConfiguration {
  jwt: JwtModuleOptions & {
    accessTokenExpiresIn: number;
  };
}
