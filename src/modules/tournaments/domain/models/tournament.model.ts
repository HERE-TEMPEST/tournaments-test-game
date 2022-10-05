import { TournamentMemberModel } from './tournament-member.model';

export interface TournamentModel {
  id: number;
  isStarted: boolean;
  name: string;
  duration: number;
  currentAmount: number;
  capacity: number;
  region: string;
  members: Array<TournamentMemberModel>;
}
