import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../application';
import { LocalLoginInput, LocalRegisterUserInput } from './inputs';
import { LocalLoginResult, LocalRegisterResult } from './results';

@ApiTags('Auth')
@Controller()
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: LocalLoginResult })
  @Post('/login')
  async login(@Body() input: LocalLoginInput): Promise<LocalLoginResult> {
    const { accessToken } = await this.authService.login(input);

    return {
      data: {
        accessToken,
      },
    };
  }

  @ApiOkResponse({ type: LocalRegisterResult })
  @Post('/registeruser')
  async registerUser(
    @Body() input: LocalRegisterUserInput,
  ): Promise<LocalRegisterResult> {
    const { accessToken } = await this.authService.registerUser(input);

    return {
      data: {
        accessToken,
      },
    };
  }
}
