import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class JoinEvent {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  tournamentId: number;
}
