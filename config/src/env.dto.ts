import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnvironmentVariablesDto {
  @IsNumber()
  @IsNotEmpty()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  APP_HOST: string;

  @IsString()
  @IsNotEmpty()
  AWS_REGION: string;

  @IsString()
  @IsNotEmpty()
  AWS_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_BUCKET: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_ENDPOINT: string;

  @IsString()
  @IsNotEmpty()
  AUTH_20_REDIRECT: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_LOGIN_CALLBACK: string;

  @IsString()
  @IsNotEmpty()
  MONGO_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  MONGO_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  MONGO_DATABASE: string;

  @IsNumber()
  @IsNotEmpty()
  MONGO_PORT: number;

  @IsString()
  @IsNotEmpty()
  MONGO_HOST: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsNumber()
  @IsNotEmpty()
  POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
}
