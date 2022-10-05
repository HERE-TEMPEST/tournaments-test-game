import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LocalLoginInput {
  @ApiProperty({ nullable: false, type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
