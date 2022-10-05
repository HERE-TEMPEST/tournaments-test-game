import { AwsS3Configuration } from './aws-s3-configuration.type';

export const getAwsS3Config = (): AwsS3Configuration => ({
  awsS3: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_S3_BUCKET,
    endpoint: process.env.AWS_S3_ENDPOINT,
    region: process.env.AWS_REGION,
    expiresIn: Number(process.env.AWS_S3_EXPIRES_IN),
  },
});
