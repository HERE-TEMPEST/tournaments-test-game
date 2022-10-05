import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  ExistsUserInTournament,
  GetMemberByIdAndTournamentId,
  GetMembersByTournamentIdParams,
  ITournamentMembersRepository,
  TournamentMemberModel,
} from '../../domain';

import { TournamentMemberEntity } from '../entities';
import { TOURNAMENT_RELATIONS_CONNECTION } from '../tokens';

@Injectable()
export class TournamentMemberRepository
  extends Repository<TournamentMemberEntity>
  implements ITournamentMembersRepository
{
  constructor(
    @InjectEntityManager(TOURNAMENT_RELATIONS_CONNECTION)
    tournamentMemberEntityManager: EntityManager,
  ) {
    super(TournamentMemberEntity, tournamentMemberEntityManager);
  }

  async getMembersByTournamentId(
    params: GetMembersByTournamentIdParams,
  ): Promise<TournamentMemberModel[]> {
    const { id } = params;

    return this.findBy({ tournament: { id } });
  }

  async existsUserInTournament(
    params: ExistsUserInTournament,
  ): Promise<boolean> {
    const { tournamentId, userId } = params;

    const count = await this.countBy({
      tournament: { id: tournamentId },
      memberId: userId,
    });

    return count > 0;
  }

  getMemberByIdAndTournamentId(
    params: GetMemberByIdAndTournamentId,
  ): Promise<TournamentMemberModel> {
    const { memberId, tournamentId } = params;

    return this.findOne({
      where: { memberId, tournament: { id: tournamentId } },
      relations: { tournament: true },
    });
  }
}
