import { GoogleAuth20Configuration } from './google-auth20-configuration.type';

export const getGoogleAuth20Config = (): GoogleAuth20Configuration => ({
  google_auth20: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_LOGIN_CALLBACK,
  },
});
