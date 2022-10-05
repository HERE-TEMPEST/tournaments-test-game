import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResultEvent {
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
