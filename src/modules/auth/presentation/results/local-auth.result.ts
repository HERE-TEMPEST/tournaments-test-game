import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenDto } from '../dtos';

export class LocalLoginResult {
  @ApiProperty({ nullable: true, type: AccessTokenDto })
  data: AccessTokenDto;
}
