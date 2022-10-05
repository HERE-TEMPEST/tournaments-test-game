import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthMiddleware } from '@tournaments/auth';
import {
  MongooseConfigService,
  PostgresConfigService,
  ENTITY_TOKEN,
  validateConfig,
  configLoad,
  JwtConfigService,
} from '@tournaments/config';

import { UsersModule } from './users';
import { AuthModule } from './auth';
import {
  TournamentsModule,
  TOURNAMENT_RELATIONS_CONNECTION,
  TournamentEntity,
  TournamentMemberEntity,
} from './tournaments';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configLoad,
      validate: validateConfig,
    }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      name: TOURNAMENT_RELATIONS_CONNECTION,
      extraProviders: [
        {
          provide: ENTITY_TOKEN,
          useValue: [TournamentEntity, TournamentMemberEntity],
        },
      ],
      inject: [ENTITY_TOKEN],
    }),
    UsersModule,
    AuthModule,
    TournamentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}
