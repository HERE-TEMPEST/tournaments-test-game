import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

import { Configuration } from '@tournaments/config';

import { AuthService } from '../application';
import { GoogleAuth20Guard } from '../infrastructure';

@ApiTags('Google OAuth 2.0')
@Controller('google')
export class GoogleAuth20Controller {
  private readonly redirectToUi: string;

  constructor(
    private readonly configService: ConfigService<Configuration>,
    private readonly authService: AuthService,
  ) {
    this.redirectToUi = this.configService.get('app').redirectUriToUi;
  }

  @Get('/login')
  @UseGuards(GoogleAuth20Guard)
  async googleLogin(): Promise<void> {
    return;
  }

  @ApiExcludeEndpoint()
  @Get('/redirect')
  @UseGuards(GoogleAuth20Guard)
  async handleGoogleRedirect(@Req() request: Request) {
    const user = request.user as any;

    console.log('some');

    const { accessToken } = await this.authService.googleLogin(user);

    const redirectUri = this.getRedirectUri({ accessToken });

    return {
      url: redirectUri,
      statusCode: HttpStatus.TEMPORARY_REDIRECT,
    };
  }

  private getRedirectUri({ accessToken }: { accessToken: string }) {
    const redirectUrl = new URL(this.redirectToUi);

    redirectUrl.pathname = '/auth20/callback';
    redirectUrl.searchParams.append('accessToken', accessToken);

    return redirectUrl.toString();
  }
}
