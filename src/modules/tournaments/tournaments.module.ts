import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { JwtConfigService } from '@tournaments/config';
import { WsAuthGuard } from '@tournaments/auth';

import { TournamentsController, TournamentsGateway } from './presentation';
import { TournamentsService } from './application';
import { TournamentDomain } from './domain';
import {
  TOURNAMENT_RELATIONS_CONNECTION,
  TournamentEntity,
  TournamentMemberEntity,
  TournamentRepository,
  TournamentMemberRepository,
  TOURNAMENTS_REPOSITORY_TOKEN,
  TOURNAMENTS_MEMBERS_REPOSITORY_TOKEN,
} from './infrastructure';
import { UsersModule } from '../users';

@Module({
  imports: [
    UsersModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature(
      [TournamentEntity, TournamentMemberEntity],
      TOURNAMENT_RELATIONS_CONNECTION,
    ),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  providers: [
    TournamentsGateway,
    {
      provide: TOURNAMENTS_REPOSITORY_TOKEN,
      useClass: TournamentRepository,
    },
    {
      provide: TOURNAMENTS_MEMBERS_REPOSITORY_TOKEN,
      useClass: TournamentMemberRepository,
    },
    WsAuthGuard,
    TournamentDomain,
    TournamentsService,
  ],
  controllers: [TournamentsController],
})
export class TournamentsModule {}
