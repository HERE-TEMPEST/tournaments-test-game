export interface AwsS3Configuration {
  awsS3: {
    accessKeyId: string;
    bucket: string;
    endpoint: string;
    region: string;
    secretAccessKey: string;
    expiresIn: number;
  };
}
