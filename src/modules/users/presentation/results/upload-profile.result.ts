import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from '../dtos';

export class UploadProfileResult {
  @ApiProperty({ nullable: true, type: ProfileDto })
  data?: ProfileDto;
}
