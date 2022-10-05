import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { headers } = request;
    const { authorization } = headers;

    if (!authorization) {
      request.userCredentials = null;

      return next();
    }

    try {
      const [, accessToken] = authorization.split(' ');

      const payload = await this.jwtService.verify<JwtPayload>(accessToken);

      request.userCredentials = payload;
    } catch (error) {
      console.log(error);
      request.userCredentials = null;
    } finally {
      return next();
    }
  }
}
