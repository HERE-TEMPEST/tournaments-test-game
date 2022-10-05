import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AwsS3ModuleOptions,
  AwsS3ModuleOptionsFactory,
} from '@tournaments/aws/s3';

import { AwsS3Configuration } from './aws-s3-configuration.type';

@Injectable()
export class AwsS3ConfigService implements AwsS3ModuleOptionsFactory {
  constructor(
    private readonly configService: ConfigService<AwsS3Configuration>,
  ) {}

  useAwsS3OptionsFactory(): AwsS3ModuleOptions {
    const {
      accessKeyId,
      bucket,
      endpoint,
      region,
      secretAccessKey,
      expiresIn,
    } = this.configService.get('awsS3');

    return {
      acl: 'private',
      bucketName: bucket,
      endpoint,
      apiVersion: 'latest',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
      forcePathStyle: true, // for MINIO
      expiresIn,
    };
  }
}
