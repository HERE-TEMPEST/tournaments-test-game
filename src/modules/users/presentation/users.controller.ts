import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { AuthGuard } from '@tournaments/auth';

import { UsersService } from '../application';
import {
  GetUserInfoResult,
  GetProfileResult,
  UploadProfileResult,
} from './results';

@ApiTags('User')
@Controller()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: GetUserInfoResult })
  @ApiBearerAuth()
  @Get('/userinfo')
  async userInfo(@Req() request: Request): Promise<GetUserInfoResult> {
    const { userId } = request.userCredentials;

    const userInfo = await this.usersService.getUserInfo(userId);
    return {
      data: userInfo,
    };
  }

  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: UploadProfileResult })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/uploadprofile')
  @UseInterceptors(FileInterceptor('profile'))
  async uploadProfile(
    @Req() request: Request,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<UploadProfileResult> {
    if (!file) {
      throw new BadRequestException('filed profile not defined');
    }

    const { userId } = request.userCredentials;

    const { key, uri } = await this.usersService.updateProfile({
      userId,
      profile: file,
    });

    return {
      data: {
        key,
        uri,
      },
    };
  }

  @ApiOkResponse({ type: GetProfileResult })
  @ApiBearerAuth()
  @Get('/getprofile')
  async getProfile(@Req() request: Request): Promise<GetProfileResult> {
    const { userId } = request.userCredentials;

    const { key, uri } = await this.usersService.getUserProfile({ userId });

    return {
      data: {
        key,
        uri,
      },
    };
  }
}
