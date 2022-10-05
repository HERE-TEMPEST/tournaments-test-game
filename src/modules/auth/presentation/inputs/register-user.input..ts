import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LocalRegisterUserInput {
  @ApiProperty({ nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ nullable: false, type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  nickName: string;
}
