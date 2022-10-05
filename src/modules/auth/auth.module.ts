import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfigService } from '@tournaments/config';

import { GoogleAuth20Strategy } from './infrastructure';
import { AuthDomain } from './domain';
import { AuthService } from './application';
import { AuthController, GoogleAuth20Controller } from './presentation';

// Users module
import { UsersModule } from '../users';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  controllers: [AuthController, GoogleAuth20Controller],
  providers: [AuthService, AuthDomain, GoogleAuth20Strategy],
})
export class AuthModule {}
