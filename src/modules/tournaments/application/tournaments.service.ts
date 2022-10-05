import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { TournamentDomain, TournamentMemberModel } from '../domain';
import {
  TournamentMemberRepository,
  TournamentRepository,
  TOURNAMENTS_REPOSITORY_TOKEN,
  TOURNAMENTS_MEMBERS_REPOSITORY_TOKEN,
} from '../infrastructure';
import {
  CreateTournamentParams,
  CreateTournamentResult,
  GetAllTournamentsResult,
  AddUserToTournamentParams,
  AddUserToTournamentResult,
  StartTournamentParams,
  StartTournamentResult,
  AddResultParams,
  GetTournamentWinnerParams,
  RemoveUserFromTournamentParams,
  CheckTournamentEndParams,
} from './tournament-service.type';
import { UserModel, UsersService } from '../../users';

@Injectable()
export class TournamentsService {
  constructor(
    private readonly tournamentDomain: TournamentDomain,
    @Inject(TOURNAMENTS_REPOSITORY_TOKEN)
    private readonly tournamentRepository: TournamentRepository,
    @Inject(TOURNAMENTS_MEMBERS_REPOSITORY_TOKEN)
    private readonly tournamentMembersRepository: TournamentMemberRepository,
    private readonly scheduleService: SchedulerRegistry,
    private readonly usersService: UsersService,
  ) {}

  async createTournament(
    params: CreateTournamentParams,
  ): Promise<CreateTournamentResult> {
    const newTournament = await this.tournamentDomain.createTournament(params);

    const tournament = await this.tournamentRepository.save(newTournament);

    return {
      tournament,
    };
  }

  async all(): Promise<GetAllTournamentsResult> {
    const tournaments = await this.tournamentRepository.find();

    return {
      tournaments,
    };
  }

  async addUserToTournament(
    params: AddUserToTournamentParams,
  ): Promise<AddUserToTournamentResult> {
    const { tournamentId, userId } = params;

    const member = await this.tournamentDomain.addUserToTournament({
      tournamentId,
      userId,
    });

    if (!member) {
      return {
        isConnected: false,
        tournament: null,
      };
    }
    const newMember = await this.tournamentMembersRepository.save(member);

    return {
      isConnected: true,
      tournament: newMember.tournament,
    };
  }

  async startTournament(
    params: StartTournamentParams,
  ): Promise<StartTournamentResult> {
    let { tournament } = params;
    const { endedTournamentCallback } = params;

    if (typeof tournament === 'number') {
      tournament = await this.tournamentRepository.findOneBy({
        id: tournament,
      });
    }

    const isStartedGame = this.tournamentDomain.checkStartGame(tournament);

    await this.tournamentRepository.update(
      { id: tournament.id },
      { isStarted: isStartedGame },
    );

    // Cron
    if (isStartedGame) {
      const cron = new CronJob(`*/${tournament.duration} * * * *`, async () => {
        cron.stop();
        await endedTournamentCallback();
      });
      this.scheduleService.addCronJob(`tournament:${tournament.id}`, cron);

      cron.start();
    }

    return {
      isStartedGame,
    };
  }

  async removeUserFromTournament(
    params: RemoveUserFromTournamentParams,
  ): Promise<boolean> {
    const { tournamentId, userId } = params;

    const isDeleted = await this.tournamentDomain.removeUserFromTournament({
      tournamentId,
    });

    if (isDeleted) {
      await this.tournamentMembersRepository.delete({
        memberId: userId,
        tournament: { id: tournamentId },
      });
    }
    return isDeleted;
  }

  async addResult(params: AddResultParams) {
    const { score, tournamentId, userId } = params;

    await this.tournamentMembersRepository.update(
      {
        tournament: { id: tournamentId },
        memberId: userId,
      },
      {
        score,
      },
    );
  }

  async checkTournamentEnd(
    params: CheckTournamentEndParams,
  ): Promise<TournamentMemberModel | null> {
    const { tournamentId } = params;

    const { winner } = await this.tournamentDomain.getTournamentWinner({
      tournamentId,
    });

    if (winner) {
      // if everyone left the tournament ahead of schedule
      const cron = this.scheduleService.getCronJob(
        `tournament:${tournamentId}`,
      );
      cron.stop();
      this.scheduleService.deleteCronJob(`tournament:${tournamentId}`);
    }

    return winner;
  }

  async getTournamentWinner(
    params: GetTournamentWinnerParams,
  ): Promise<UserModel | null> {
    const { tournamentId } = params;

    const { winner } = await this.tournamentDomain.getTournamentWinner({
      tournamentId,
    });

    if (winner) {
      const { memberId } = winner;

      return this.usersService.getUserInfo({ userId: memberId });
    }

    return null;
  }
}
