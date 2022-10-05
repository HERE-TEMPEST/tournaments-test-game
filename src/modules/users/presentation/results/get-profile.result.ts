import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from '../dtos';

export class GetProfileResult {
  @ApiProperty({ nullable: true, type: ProfileDto })
  data?: ProfileDto;
}
