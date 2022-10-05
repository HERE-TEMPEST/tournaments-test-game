import { TournamentModel } from './tournament.model';

export interface TournamentMemberModel {
  memberId: string;
  score: number;
  tournament: TournamentModel;
}
