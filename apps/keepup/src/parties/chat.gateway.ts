import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsJwtAuthGuard } from 'apps/auth/src/guards/wsjwt.guard';
import { Server, Socket } from 'socket.io';
import { OnlineService } from './online.service';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({
  cors: { origin: ['http://127.0.0.1:5173', 'localhost:5173'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private onlineService: OnlineService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('chat connect', client.data);
    return this.server;
  }

  async handleDisconnect(client: Socket) {
    console.log('chat disconnect');
    const deleted = await this.onlineService.removeUser(client.data.user.id);
    if (deleted.acknowledged) {
      console.log('user offline');
    }
  }

  @SubscribeMessage('online')
  async handleOnline(client: Socket) {
    const onlineUser = await this.onlineService.addUser(
      client.data.user.id,
      client.id,
    );
    if (onlineUser) {
      console.log('user online');
    }
  }
}
