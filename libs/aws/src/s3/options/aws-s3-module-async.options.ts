import { InjectionToken } from '@nestjs/common';
import { Type } from '@nestjs/common';
import { AwsS3ModuleOptionsFactory } from '../types/aws-s3-options-factory.interface';
import { AwsS3ModuleOptions } from './aws-s3-module.options';

export interface AwsS3ModuleAsyncOptions {
  imports?: Array<any>;
  useFactory?: (...args: any[]) => AwsS3ModuleOptions;
  useClass?: Type<AwsS3ModuleOptionsFactory>;
  useExisting?: Type<AwsS3ModuleOptionsFactory>;
  inject?: Array<InjectionToken>;
}
