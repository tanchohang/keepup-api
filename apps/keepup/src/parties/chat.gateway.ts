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
import { UsersService } from '../users/users.service';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({
  cors: { origin: ['http://127.0.0.1:5173', 'localhost:5173'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private userService: UsersService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('chat connect');
    return this.server;
  }

  async handleDisconnect(client: Socket) {
    console.log('chat disconnect');
    const onlineUser = await this.userService.findByUsername(
      client.data.user.username,
    );
    if (onlineUser) {
      onlineUser.online = false;
      onlineUser.save();
      console.log('user offline');
    }
  }

  @SubscribeMessage('online')
  async handleOnline(client: Socket) {
    // const onlineUser = await this.onlineService.addUser(
    //   client.data.user.id,
    //   client.id,
    // );
    const onlineUser = await this.userService.findByUsername(
      client.data.user.username,
    );
    if (onlineUser) {
      onlineUser.online = true;
      onlineUser.save();
      console.log('user online', client.id);
    }
  }
}
