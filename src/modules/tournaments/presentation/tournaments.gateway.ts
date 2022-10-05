import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WsResponse,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';

import { WsAuthGuard } from '@tournaments/auth';

import { TournamentsService } from '../application';
import { JoinEvent, ResultEvent } from './events';

@UsePipes(ValidationPipe)
@WebSocketGateway({ namespace: 'tournaments' })
export class TournamentsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() private readonly tournamentsNamespace: Namespace;
  private readonly logger: Logger;

  constructor(
    private readonly tournamentsService: TournamentsService,
    private readonly wsAuthGuard: WsAuthGuard,
  ) {
    this.logger = new Logger('Tournaments');
  }

  @SubscribeMessage('join')
  async joinToTournament(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: JoinEvent,
  ): Promise<WsResponse> {
    const { tournamentId } = message;
    const { userId } = client.user;

    const { isConnected, tournament } =
      await this.tournamentsService.addUserToTournament({
        tournamentId,
        userId,
      });

    if (isConnected) {
      client.currentTournament = {
        tournamentId,
      };

      client.join(String(tournamentId));
      client.emit('joined');

      this.tournamentsNamespace.to(String(tournamentId)).emit('user_connected');

      const { isStartedGame } = await this.tournamentsService.startTournament({
        tournament,
        endedTournamentCallback: async () => {
          this.tournamentsNamespace.to(String(tournamentId)).emit('finish');
        },
      });

      if (isStartedGame) {
        this.tournamentsNamespace.to(String(tournamentId)).emit('start');
      }
      return;
    }

    client.emit('not_joined');
  }

  @SubscribeMessage('leave')
  async leaveFromTournament(
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    if (client.currentTournament) {
      const { userId } = client.user;
      const { tournamentId } = client.currentTournament;

      await this.tournamentsService.removeUserFromTournament({
        tournamentId,
        userId,
      });

      this.tournamentsNamespace
        .to(String(tournamentId))
        .emit('user_disconnected');

      client.leave(String(tournamentId));

      client.currentTournament = null;
    }
    return {
      data: null,
      event: 'leaved',
    };
  }

  @SubscribeMessage('result')
  async result(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: ResultEvent,
  ) {
    if (client.currentTournament) {
      const { tournamentId } = client.currentTournament;
      const { userId } = client.user;
      const { score } = message;

      await this.tournamentsService.addResult({
        score,
        userId,
        tournamentId,
      });

      const winner = await this.tournamentsService.getTournamentWinner({
        tournamentId,
      });

      if (winner) {
        this.tournamentsNamespace
          .to(String(tournamentId))
          .emit('winner', winner);
      }
    }
  }

  async handleDisconnect(client: Socket) {
    if (client.currentTournament) {
      await this.result(client, { score: 0 });
    }
  }

  async handleConnection(client: Socket) {
    const isAuth = await this.wsAuthGuard.canActivate(client);

    if (!isAuth) {
      client.removeAllListeners();
      client.disconnect();
      return;
    }
  }

  afterInit() {
    this.logger.log('Tournaments namespace is initialized...');
  }
}
