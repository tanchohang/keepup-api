import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WsJwtAuthGuard } from 'apps/auth/src/guards/wsjwt.guard';

@WebSocketGateway({ cors: { origin: '*', credentials: true } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // constructor(private partyService: PartyService) {}

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log(client.data.user);
    // const party=
    // return 'world!';
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Connect');
  }

  handleDisconnect(client: any) {
    console.log('DISCONNECT');
  }
}
