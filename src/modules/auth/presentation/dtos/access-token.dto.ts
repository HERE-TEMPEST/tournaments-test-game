import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({ nullable: false, type: String })
  accessToken: string;
}
