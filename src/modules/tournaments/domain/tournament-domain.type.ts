import { TournamentModel } from './models';

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

export interface RemoveUserToTournamentParams {
  tournamentId: number;
}
