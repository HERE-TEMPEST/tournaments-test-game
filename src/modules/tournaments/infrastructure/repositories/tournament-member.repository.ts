import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  ExistsUserInTournament,
  GetMemberByMemberId,
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

  getMemberById(params: GetMemberByMemberId): Promise<TournamentMemberModel> {
    const { memberId } = params;

    return this.findOne({
      where: { memberId },
      relations: { tournament: true },
    });
  }
}
