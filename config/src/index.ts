export { AwsS3ConfigService } from './modules/aws/s3';
export { MongooseConfigService } from './modules/mongodb';
export { JwtConfigService } from './modules/jwt';
export { PostgresConfigService, ENTITY_TOKEN } from './modules/postgresdb';

import { getAwsS3Config } from './modules/aws/s3';
import { getMongooseConfig } from './modules/mongodb';
import { getJwtConfig } from './modules/jwt';
import { getPostgresConfig } from './modules/postgresdb';
import { getGoogleAuth20Config } from './modules/google-auth20';
import { getAppConfig } from './modules/app';

export const configLoad = [
  getAwsS3Config,
  getJwtConfig,
  getMongooseConfig,
  getPostgresConfig,
  getGoogleAuth20Config,
  getAppConfig,
];

export * from './config.type';
export * from './pipes';
