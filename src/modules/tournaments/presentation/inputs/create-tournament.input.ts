import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTournamentInput {
  @ApiProperty({ nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ nullable: false, type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  capacity: number;

  @ApiProperty({ nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ nullable: false, type: Number })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
