import { Inject, Injectable } from '@nestjs/common';

import {
  TOURNAMENTS_MEMBERS_REPOSITORY_TOKEN,
  TOURNAMENTS_REPOSITORY_TOKEN,
} from '../infrastructure';
import {
  ITournamentMembersRepository,
  ITournamentRepository,
} from './interfaces';
import { TournamentMemberModel, TournamentModel } from './models';
import {
  AddUserToTournamentsParams,
  GetTournamentWinnerParams,
  RemoveUserToTournamentParams,
  CreateTournamentParams,
} from './tournament-domain.type';

@Injectable()
export class TournamentDomain {
  constructor(
    @Inject(TOURNAMENTS_REPOSITORY_TOKEN)
    private readonly tournamentsRepository: ITournamentRepository,
    @Inject(TOURNAMENTS_MEMBERS_REPOSITORY_TOKEN)
    private readonly tournamentsMembersRepository: ITournamentMembersRepository,
  ) {}

  createTournament(
    params: CreateTournamentParams,
  ): Omit<TournamentModel, 'id' | 'members'> {
    return {
      ...params,
      currentAmount: 0,
      isStarted: false,
    };
  }

  checkStartGame(tournament: TournamentModel): boolean {
    return tournament.capacity === tournament.currentAmount;
  }

  async addUserToTournament(
    params: AddUserToTournamentsParams,
  ): Promise<TournamentMemberModel | null> {
    const { tournamentId, userId } = params;

    const isExists =
      await this.tournamentsMembersRepository.existsUserInTournament({
        tournamentId,
        userId,
      });

    if (isExists) {
      const member = await this.tournamentsMembersRepository.getMemberById({
        memberId: userId,
      });

      if (!member.tournament.isStarted) {
        return member;
      }
    }

    const isTakedSlot = await this.tournamentsRepository.attemptTakeSlot({
      tournamentId,
    });

    if (!isTakedSlot) {
      return null;
    }

    const tournament = await this.tournamentsRepository.getTournamentById({
      id: tournamentId,
    });

    return {
      memberId: userId,
      score: -1,
      tournament,
    };
  }

  async removeUserFromTournament(
    params: RemoveUserToTournamentParams,
  ): Promise<boolean> {
    const { tournamentId } = params;

    return this.tournamentsRepository.attemptVacateSlot({
      tournamentId,
    });
  }

  async getTournamentWinner(
    params: GetTournamentWinnerParams,
  ): Promise<TournamentMemberModel | null> {
    const { tournamentId } = params;

    const members =
      await this.tournamentsMembersRepository.getMembersByTournamentId({
        id: tournamentId,
      });

    const res = members.every(
      (member: TournamentMemberModel) => member.score !== -1,
    );

    if (res) {
      return members.reduce((currentWinner, member) => {
        return currentWinner.score > member.score ? currentWinner : member;
      });
    }

    return null;
  }
}
