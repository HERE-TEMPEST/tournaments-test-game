import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@tournaments/auth';

import { CreateTournamentInput } from './inputs';
import { TournamentsService } from '../application';
import { CreateTournamentResult, GetAllTournamentsResult } from './results';

@ApiTags('Tournaments')
@UseGuards(AuthGuard)
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentService: TournamentsService) {}

  @ApiOkResponse({ type: GetAllTournamentsResult })
  @ApiBearerAuth()
  @Get()
  async getAll(): Promise<GetAllTournamentsResult> {
    const { tournaments } = await this.tournamentService.all();

    return { data: tournaments };
  }

  @ApiOkResponse({ type: CreateTournamentResult })
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() input: CreateTournamentInput,
  ): Promise<CreateTournamentResult> {
    const { tournament } = await this.tournamentService.createTournament(input);

    return {
      data: tournament,
    };
  }
}
