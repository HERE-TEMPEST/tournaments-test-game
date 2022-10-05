import { JwtConfiguration } from './jwt-configuration.type';

export const getJwtConfig = (): JwtConfiguration => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
  },
});
