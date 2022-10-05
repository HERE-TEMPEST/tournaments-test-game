import { Inject, Injectable } from '@nestjs/common';
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
} from './tournament-service.type';

@Injectable()
export class TournamentsService {
  constructor(
    private readonly tournamentDomain: TournamentDomain,
    @Inject(TOURNAMENTS_REPOSITORY_TOKEN)
    private readonly tournamentRepository: TournamentRepository,
    @Inject(TOURNAMENTS_MEMBERS_REPOSITORY_TOKEN)
    private readonly tournamentMembersRepository: TournamentMemberRepository,
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
        console.log('cron!');
        cron.stop();
        await endedTournamentCallback();
      });
      cron.start();
    }

    return {
      isStartedGame,
    };
  }

  async removeUserFromTournament(
    params: RemoveUserFromTournamentParams,
  ): Promise<void> {
    const { tournamentId, userId } = params;

    const member = await this.tournamentDomain.removeUserFromTournament({
      tournamentId,
    });

    if (member)
      await this.tournamentMembersRepository.delete({
        memberId: userId,
        tournament: { id: tournamentId },
      });
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

  async getTournamentWinner(
    params: GetTournamentWinnerParams,
  ): Promise<TournamentMemberModel | null> {
    const { tournamentId } = params;

    const winner = await this.tournamentDomain.getTournamentWinner({
      tournamentId,
    });

    return winner;
  }
}
