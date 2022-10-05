import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { Configuration } from '@tournaments/config';

@Injectable()
export class GoogleAuth20Strategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService<Configuration>) {
    super({
      clientID: configService.get('google_auth20').clientID,
      clientSecret: configService.get('google_auth20').clientSecret,
      callbackURL: configService.get('google_auth20').callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { emails, name, photos } = profile;

    return {
      accessToken,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      profileUri: photos[0].value,
    };
  }
}
