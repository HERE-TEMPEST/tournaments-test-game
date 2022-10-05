import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import {
  AttemptTakeSlotParams,
  GetTournamentByIdParams,
  ITournamentRepository,
  TournamentModel,
} from '../../domain';
import { TournamentEntity } from '../entities';
import { TOURNAMENT_RELATIONS_CONNECTION } from '../tokens';

@Injectable()
export class TournamentRepository
  extends Repository<TournamentEntity>
  implements ITournamentRepository
{
  constructor(
    @InjectEntityManager(TOURNAMENT_RELATIONS_CONNECTION)
    tournamentEntityManager: EntityManager,
  ) {
    super(TournamentEntity, tournamentEntityManager);
  }

  async attemptTakeSlot(params: AttemptTakeSlotParams): Promise<boolean> {
    const { tournamentId } = params;

    const { affected } = await this.createQueryBuilder()
      .update(TournamentEntity)
      .set({ currentAmount: () => 'current_amount + 1' })
      .where('id = :id', { id: tournamentId })
      .andWhere('capacity > current_amount')
      .andWhere('is_started = FALSE')
      .returning('*')
      .execute();

    return affected ? true : false;
  }

  async attemptVacateSlot(params: AttemptTakeSlotParams): Promise<boolean> {
    const { tournamentId } = params;

    const { affected } = await this.createQueryBuilder()
      .update(TournamentEntity)
      .set({ currentAmount: () => 'current_amount - 1' })
      .where('id = :id', { id: tournamentId })
      .andWhere('current_amount > 0')
      .andWhere('is_started = FALSE')
      .returning('*')
      .execute();

    return affected ? true : false;
  }

  getAllTournaments(): Promise<TournamentModel[]> {
    return this.find();
  }
  getTournamentById(params: GetTournamentByIdParams): Promise<TournamentModel> {
    const { id } = params;

    return this.findOneBy({ id });
  }
}
