import { ObjectCannedACL, S3ClientConfig } from '@aws-sdk/client-s3';

export interface AwsS3ModuleOptions extends S3ClientConfig {
  acl: ObjectCannedACL;
  bucketName: string;
  expiresIn: number;
  endpoint: string;
}
