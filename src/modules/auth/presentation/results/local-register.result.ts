import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenDto } from '../dtos';

export class LocalRegisterResult {
  @ApiProperty({ nullable: true, type: AccessTokenDto })
  data: AccessTokenDto;
}
