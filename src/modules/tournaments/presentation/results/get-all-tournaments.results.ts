import { ApiProperty } from '@nestjs/swagger';
import { TournamentDto } from '../dtos';

export class GetAllTournamentsResult {
  @ApiProperty({ nullable: false, isArray: true, type: TournamentDto })
  data: Array<TournamentDto>;
}
