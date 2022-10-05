import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AwsS3Module } from '@tournaments/aws/s3';
import { AwsS3ConfigService } from '@tournaments/config';

import { UsersController } from './presentation';
import { UsersService } from './application';
import { UserDomain } from './domain';
import {
  UserRepository,
  USER_REPOSITORY_TOKEN,
  UserModelDefinition,
} from './infrastructure';

@Module({
  imports: [
    AwsS3Module.forRootAsync({
      useClass: AwsS3ConfigService,
    }),
    MongooseModule.forFeature([UserModelDefinition]),
  ],
  providers: [
    UserDomain,
    UsersService,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
