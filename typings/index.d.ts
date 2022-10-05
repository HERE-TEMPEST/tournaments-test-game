import { JwtPayload } from '../src/modules/auth/core';

declare global {
  declare namespace Express {
    interface Request {
      userCredentials?: JwtPayload;
    }
  }
}

declare module 'socket.io' {
  interface Socket {
    user: JwtPayload;
    currentTournament?: {
      tournamentId: number;
    };
  }
}

declare module '@nestjs/config' {
  class ConfigService<Config extends Record<unknown, Record<string, unknown>>> {
    public get<ConfigKey extends keyof Config>(
      parameter: ConfigKey,
    ): Config[ConfigKey];
  }
}
