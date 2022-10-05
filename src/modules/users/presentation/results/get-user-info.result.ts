import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../dtos';

export class GetUserInfoResult {
  @ApiProperty({ nullable: true, type: UserDto })
  data: UserDto;
}
