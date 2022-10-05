import { TournamentMemberModel, TournamentModel } from '../models';

export interface ITournamentMembersRepository {
  getMembersByTournamentId(
    params: GetMembersByTournamentIdParams,
  ): Promise<Array<TournamentMemberModel>>;

  existsUserInTournament(params: ExistsUserInTournament): Promise<boolean>;

  getMemberById(
    params: GetMemberByMemberId,
  ): Promise<TournamentMemberModel | null>;
  // takeSlot(params: TakeSlotParams): Promise<TournamentMemberModel | null>;
  // vacateSlot(params: VacateSlotParams): Promise<TournamentMemberModel | null>;
}

export type GetMembersByTournamentIdParams = Pick<TournamentModel, 'id'>;
export interface ExistsUserInTournament {
  userId: string;
  tournamentId: number;
}
export type GetMemberByMemberId = Pick<TournamentMemberModel, 'memberId'>;
