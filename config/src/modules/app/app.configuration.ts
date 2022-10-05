import { AppConfiguration } from './app-configuration.type';

export const getAppConfig = (): AppConfiguration => ({
  app: {
    host: process.env.APP_HOST,
    port: Number(process.env.APP_PORT),
    redirectUriToUi: process.env.AUTH_20_REDIRECT,
  },
});
