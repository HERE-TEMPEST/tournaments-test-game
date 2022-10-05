import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TournamentMemberEntity } from './tournament-member.entity';
import { TournamentModel } from '../../domain';

@Entity({ name: 'tournaments' })
export class TournamentEntity implements TournamentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, name: 'current_amount' })
  currentAmount: number;

  @Column({ nullable: false })
  capacity: number;

  @Column({ nullable: false })
  region: string;

  @Column({ nullable: false })
  duration: number;

  @OneToMany(
    (type) => TournamentMemberEntity,
    (tournament) => tournament.tournament,
  )
  members: Array<TournamentMemberEntity>;

  @Column({ default: false, name: 'is_started' })
  isStarted: boolean;
}
