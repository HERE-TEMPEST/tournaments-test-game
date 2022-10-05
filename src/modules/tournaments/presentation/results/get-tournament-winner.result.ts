import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../users/presentation/dtos';

export class GetTournamentWinnerResult {
  @ApiProperty({ nullable: true, type: UserDto })
  data?: UserDto;
}
