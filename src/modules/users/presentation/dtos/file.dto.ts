import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({ nullable: true, type: String })
  key?: string;
  @ApiProperty({ type: String })
  uri: string;
}
