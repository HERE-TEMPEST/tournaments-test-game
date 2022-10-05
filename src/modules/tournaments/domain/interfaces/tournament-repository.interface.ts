import { TournamentModel } from '../models';

export interface ITournamentRepository {
  attemptTakeSlot(params: AttemptTakeSlotParams): Promise<boolean>;
  attemptVacateSlot(params: AttemptVacateSlotParams): Promise<boolean>;

  getTournamentById(
    params: GetTournamentByIdParams,
  ): Promise<TournamentModel | null>;

  // takeSlot(params: TakeSlotParams): Promise<TournamentMemberModel | null>;
  // vacateSlot(params: VacateSlotParams): Promise<TournamentMemberModel | null>;
}

export interface AttemptTakeSlotParams {
  tournamentId: number;
}
export type AttemptVacateSlotParams = AttemptTakeSlotParams;

export interface TakeSlotParams {
  tournamentId: number;
  userId: number;
}

export type VacateSlotParams = TakeSlotParams;

export type GetTournamentByIdParams = Pick<TournamentModel, 'id'>;
