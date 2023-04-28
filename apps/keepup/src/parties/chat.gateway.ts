import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsJwtAuthGuard } from 'apps/auth/src/guards/wsjwt.guard';
import { Server } from 'socket.io';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({
  cors: { origin: ['http://127.0.0.1:5173', 'localhost:5173'] },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('chat connection');
  }

  @SubscribeMessage('isActive')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
