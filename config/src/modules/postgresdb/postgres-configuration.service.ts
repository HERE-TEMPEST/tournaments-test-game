import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConfiguration } from './postgres-configuration.type';
import { ENTITY_TOKEN } from './tokens';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService<PostgresConfiguration>,
    @Inject(ENTITY_TOKEN)
    private readonly entities: Array<any> = [],
  ) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    const { username, password, port, host, database } =
      this.configService.get('postgres');

    return {
      type: 'postgres',
      username,
      password,
      port,
      host,
      database,
      entities: this.entities,
      synchronize: true,
      // logging: true,
      name: connectionName,
    };
  }
}
