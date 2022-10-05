import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';

import { AwsS3ModuleOptions } from './options/aws-s3-module.options';
import { AWS_S3_MODULE_TOKEN } from './tokens';
import {
  GetFileUriParams,
  GetFileUriResult,
  PutFileParams,
  PutFileResult,
} from './types/aws-s3-service.type';

@Injectable()
export class AwsS3Service {
  private readonly s3: S3Client;
  private readonly acl: string;
  private readonly bucketName: string;
  private readonly expiresIn: number;

  constructor(@Inject(AWS_S3_MODULE_TOKEN) options: AwsS3ModuleOptions) {
    const { acl, bucketName, expiresIn, ...s3Options } = options;

    console.log('some');

    this.acl = acl;
    this.bucketName = bucketName;
    this.expiresIn = expiresIn;

    this.s3 = new S3Client(s3Options);
  }

  async putFile({
    file,
    name,
    subPath,
  }: PutFileParams): Promise<PutFileResult> {
    const { buffer, mimetype, originalname } = file;

    const extention = originalname.split('.').pop() || '';

    const key = `${subPath}${name}-${Date.now()}.${extention}`;

    const command = new PutObjectCommand({
      ACL: this.acl,
      Body: buffer,
      Bucket: this.bucketName,
      ContentType: mimetype,
      Key: key,
    });

    await this.s3.send(command);

    return {
      key: key,
    };
  }

  async getFileUri({ key }: GetFileUriParams): Promise<GetFileUriResult> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const signedUri = await getSignedUrl(this.s3, command, {
      expiresIn: this.expiresIn,
    });

    return {
      key,
      uri: signedUri,
    };
  }
}
