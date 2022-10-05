import { TournamentMemberModel, TournamentModel } from './models';

export interface AddUserToTournamentsParams {
  userId: string;
  tournamentId: number;
}

export type CreateTournamentParams = Omit<
  TournamentModel,
  'id' | 'currentAmount' | 'members' | 'isStarted'
>;

export interface GetTournamentWinnerParams {
  tournamentId: number;
}
export interface GetTournamentWinnerResult {
  tournament: TournamentModel;
  winner: TournamentMemberModel;
}

export interface RemoveUserToTournamentParams {
  tournamentId: number;
}
