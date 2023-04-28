import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { PartiesService } from '../parties/parties.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'apps/auth/src/guards/wsjwt.guard';

@WebSocketGateway({
  namespace: 'messages',
  cors: { origin: ['http://127.0.0.1:5173', 'localhost:5173'] },
})
export class MessageGateway implements OnGatewayInit {
  constructor(private readonly partiesService: PartiesService) {}

  @WebSocketServer() server: Namespace;

  afterInit(server: Namespace) {
    console.log('afterInit');
    // server.
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log('connect', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('disconnect', client.id);
  }
  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('createMessage')
  async create(client: Socket, payload: { text: string; party: string }) {
    const message = await this.partiesService.addMessage(
      payload.party,
      { text: payload.text },
      client.data.user.id,
    );
    this.server.to(payload.party).emit('broadcastParty', message);
    // return message;
  }

  @SubscribeMessage('joinParty')
  joinParty(@MessageBody() pid: string) {
    this.server.socketsJoin(pid);
    // console.log('joinParty', pid);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    // const name = await this.messagesService.getClientUsername(client);
    // client.broadcast.emit('typing', { name, isTyping });
  }
}
