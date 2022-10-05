import { ApiProperty } from '@nestjs/swagger';
import { TournamentModel } from '../../domain';

export class TournamentDto implements Omit<TournamentModel, 'members'> {
  @ApiProperty({ nullable: false, type: Number })
  id: number;

  @ApiProperty({ nullable: false, type: Boolean })
  isStarted: boolean;

  @ApiProperty({ nullable: false, type: String })
  name: string;

  @ApiProperty({ nullable: false, type: Number })
  duration: number;

  @ApiProperty({ nullable: false, type: Number })
  currentAmount: number;

  @ApiProperty({ nullable: false, type: Number })
  capacity: number;

  @ApiProperty({ nullable: false, type: String })
  region: string;
}
