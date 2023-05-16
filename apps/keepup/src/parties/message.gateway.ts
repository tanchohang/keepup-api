import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PartiesService } from '../parties/parties.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'apps/auth/src/guards/wsjwt.guard';
import { UsersService } from '../users/users.service';
import { PeerService } from './peer.service';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({
  cors: { origin: '*' },
  path: '/ws',
})
export class MessageGateway implements OnGatewayInit {
  constructor(
    private readonly partiesService: PartiesService,
    private readonly userService: UsersService,
    private peerService: PeerService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('afterInit');
    // server.
  }
  handleConnection(socket: Socket, ...args: any[]) {
    console.log('chat connect');
  }
  async handleDisconnect(socket: Socket) {
    console.log('chat disconnect');
    const onlineUser = await this.userService.findByUsername(
      socket.data.user.username,
    );
    if (onlineUser) {
      onlineUser.online = false;
      onlineUser.save();
      console.log(socket.data.user.username, ' offline');
    }
  }

  @SubscribeMessage('createMessage')
  async create(socket: Socket, payload: { text: string; party: string }) {
    const message = await this.partiesService.addMessage(
      payload.party,
      { text: payload.text },
      socket.data.user.id,
    );
    this.server.to(payload.party).emit('broadcastParty', message);
    // return message;
  }

  @SubscribeMessage('joinParty')
  joinParty(@MessageBody() pid: string, @ConnectedSocket() socket: Socket) {
    console.log(socket.data.user.username, 'joinParty');
    this.server.socketsJoin(pid);
  }
  // @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('typing')
  async typing(socket: Socket, pid: string) {
    socket.to(pid).emit('isTyping', {
      username: socket.data.user.username,
      id: socket.data.user.id,
    });
  }

  @SubscribeMessage('call')
  async call(
    @MessageBody() body: { pid: string; offer: any },
    @ConnectedSocket() socket: Socket,
  ) {
    const peerCon = await this.peerService.createPeer({
      offer: body.offer,
      answer: null,
      party: body.pid,
    });

    if (peerCon) {
      socket.broadcast
        .to(peerCon.party.toString())
        .emit('incomingCall', { peer: peerCon._id, offer: body.offer });
      return peerCon;
    }
    throw new BadRequestException();
  }

  @SubscribeMessage('setAnswer')
  async answer(
    @MessageBody() body: { id: string; answer: any },
    @ConnectedSocket() socket: Socket,
  ) {
    const peerCon = await this.peerService.addAnswer(body.id, body.answer);
    if (peerCon) {
      socket.broadcast
        .to(peerCon.party.toString())
        .emit('onAnswer', body.answer);

      return peerCon;
    }
    throw new BadRequestException();
  }

  @SubscribeMessage('hangup')
  async hangup(@MessageBody() pid: string, @ConnectedSocket() socket: Socket) {
    socket.to(pid).emit('hungup', socket.data.user);
  }

  @SubscribeMessage('setOfferCandidates')
  async setOfferCandidates(
    @MessageBody() body: { id: string; candidates: any },
    @ConnectedSocket() socket: Socket,
  ) {
    const peerConnection = await this.peerService.addOfferCandidates(
      body.id,
      body.candidates,
    );

    if (peerConnection) {
      socket.broadcast.emit(
        'onOfferIceCandidates',
        peerConnection.offerCandidates,
      );
      return peerConnection;
    }
  }

  @SubscribeMessage('setAnswerCandidates')
  async answerCandidates(
    @MessageBody() body: { id: string; candidates: any },
    @ConnectedSocket() socket: Socket,
  ) {
    const peerConnection = await this.peerService.addAnswerCanditates(
      body.id,
      body.candidates,
    );
    socket.broadcast
      .to(peerConnection.party.toString())
      .emit('onAnswerIceCandidates', peerConnection.answerCandidates);
    return peerConnection;
  }

  @SubscribeMessage('removePeer')
  async removePeer(
    @MessageBody() body: { id: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const peerConnection = await this.peerService.removePeer(body.id);
    //   socket.broadcast
    //     .to(peerConnection.party.toString())
    //     .emit('onAnswerIceCandidates', peerConnection.answerCandidates);
    //   return peerConnection;
  }

  @SubscribeMessage('online')
  async handleOnline(client: Socket) {
    const onlineUser = await this.userService.findByUsername(
      client.data.user?.username,
    );
    if (onlineUser) {
      onlineUser.online = true;
      onlineUser.save();
      console.log(client.data.user.username, 'online');
    }
  }
}
