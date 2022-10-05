import { ApiProperty } from '@nestjs/swagger';
import { TournamentDto } from '../dtos';

export class CreateTournamentResult {
  @ApiProperty({ nullable: false, type: TournamentDto })
  data: TournamentDto;
}
