import { Global, Provider } from '@nestjs/common';
import { DynamicModule, Module } from '@nestjs/common';

import { AwsS3Service } from './aws-s3.service';
import { AwsS3ModuleAsyncOptions } from './options/aws-s3-module-async.options';
import { AwsS3ModuleOptions } from './options/aws-s3-module.options';
import { AWS_S3_MODULE_TOKEN } from './tokens';
import { AwsS3ModuleOptionsFactory } from './types';

@Module({
  providers: [AwsS3Service],
  imports: [],
  exports: [AwsS3Service],
})
@Global()
export class AwsS3Module {
  static forRoot(options: AwsS3ModuleOptions): DynamicModule {
    return {
      module: AwsS3Module,
      imports: [],
      providers: [
        {
          provide: AWS_S3_MODULE_TOKEN,
          useValue: options,
        },
        AwsS3Service,
      ],
      exports: [AwsS3Service],
    };
  }

  static forRootAsync(options: AwsS3ModuleAsyncOptions): DynamicModule {
    const providers: Array<Provider> = [];

    if (options.useFactory) {
      providers.push({
        inject: options.inject || [],
        provide: AWS_S3_MODULE_TOKEN,
        useFactory: options.useFactory,
      });
    } else {
      if (options.useClass || options.useExisting) {
        providers.push({
          inject: [options.useExisting || options.useClass],
          provide: AWS_S3_MODULE_TOKEN,
          useFactory: (factory: AwsS3ModuleOptionsFactory) =>
            factory.useAwsS3OptionsFactory(),
        });

        if (options.useClass) {
          providers.push({
            useClass: options.useClass,
            provide: options.useClass,
          });
        }
      }
    }

    providers.push(AwsS3Service);

    return {
      module: AwsS3Module,
      imports: options.imports || [],
      providers,
    };
  }
}
