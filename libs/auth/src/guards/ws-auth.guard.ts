import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(client: Socket): Promise<boolean> {
    try {
      if (!client.handshake.headers.authorization) {
        return false;
      }

      const accessToken = client.handshake.headers.authorization.split(' ')[1];

      const payload = await this.jwtService.verify(accessToken);

      client.user = payload;

      return true;
    } catch (error) {
      console.log('AuthGuard WS', error);

      return false;
    }
  }
}
