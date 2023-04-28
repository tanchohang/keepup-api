import { ExecutionContext, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('wsjwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const client: Socket = context.switchToWs().getClient();
    const authToken: string = client.handshake.auth?.token;

    if (!authToken) {
      console.log('Unauthorized access here');
      throw new WsException('Unauthorized access');
    }

    try {
      const payload = this.jwtService.verify(authToken);

      if (!payload) {
        console.log('Invalid authorization token');
        throw new WsException('Invalid authorization token');
      }
      client.data.user = { username: payload.username, id: payload.sub };

      return client;
    } catch (err) {
      console.error('Unauthorized access', err);

      throw new WsException({
        msg: 'Unauthorized access',
        error: err.message,
      });
    }
  }
}
