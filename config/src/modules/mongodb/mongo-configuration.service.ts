import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MongooseConfiguration } from './mongo-configuration.type';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    private readonly configService: ConfigService<MongooseConfiguration>,
  ) {}

  createMongooseOptions(): MongooseModuleOptions {
    const { username, password, db, port, host } =
      this.configService.get('mongoose');

    return {
      uri: `mongodb://${username}:${password}@${host}:${port}/${db}`,
      dbName: db,
    };
  }
}
