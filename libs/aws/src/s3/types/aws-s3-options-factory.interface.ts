import { AwsS3ModuleOptions } from '../options/aws-s3-module.options';

export interface AwsS3ModuleOptionsFactory {
  useAwsS3OptionsFactory: () => AwsS3ModuleOptions;
}
