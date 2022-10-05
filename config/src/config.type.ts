import { AppConfiguration } from './modules/app';
import { AwsS3Configuration } from './modules/aws/s3/aws-s3-configuration.type';
import { GoogleAuth20Configuration } from './modules/google-auth20';
import { JwtConfiguration } from './modules/jwt';
import { MongooseConfiguration } from './modules/mongodb/mongo-configuration.type';
import { PostgresConfiguration } from './modules/postgresdb/postgres-configuration.type';

export interface Configuration
  extends AwsS3Configuration,
    JwtConfiguration,
    MongooseConfiguration,
    PostgresConfiguration,
    GoogleAuth20Configuration,
    AppConfiguration {}
