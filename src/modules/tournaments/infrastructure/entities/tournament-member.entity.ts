import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TournamentMemberModel } from '../../domain';
import { TournamentEntity } from './tournament.entity';

@Entity({ name: 'tournaments_members' })
export class TournamentMemberEntity implements TournamentMemberModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  memberId: string;

  @Column({ default: 0 })
  score: number;

  @ManyToOne((type) => TournamentEntity, (tournament) => tournament.members)
  tournament: TournamentEntity;
}
