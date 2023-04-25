import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('wsjwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  // canActivate(context: ExecutionContext) {

  // const handshake = context.switchToWs().getClient();
  // // console.log(handshake);

  // const access_token = handshake.headers.auth;
  // console.log(access_token);

  // try {
  //   //   const payload = this.jwtService.verify(access_token);
  //   //   console.log(payload);
  //   return super.canActivate(handshake);

  //   if (true) return super.canActivate(context);
  //   throw new WsException('message');
  // } catch (err) {
  //   //   if (
  //   //     err instanceof JsonWebTokenError ||
  //   //     err instanceof NotBeforeError ||
  //   //     err instanceof TokenExpiredError
  //   //   ) {
  //   //     throw new WsException(err.message);

  //   throw new WsException(err.message);
  // }
  //   }

  async canActivate(context: ExecutionContext): Promise<any> {
    const client: Socket = context.switchToWs().getClient();
    const authToken: string =
      client.handshake.headers.authorization?.split(' ')[1];

    if (!authToken) {
      throw new WsException('Unauthorized access');
    }

    try {
      const payload = await this.jwtService.verify(authToken);

      if (!payload) {
        throw new WsException('Invalid authorization token');
      }
      client.data.user = { username: payload.username, id: payload.sub };

      //   const request = context.switchToHttp().getRequest();
      //   request.headers.authorization = `Bearer ${authToken}`;
      //   console.log(authToken);

      return client;
    } catch (err) {
      throw new WsException({ msg: 'Unauthorized access', error: err.message });
    }
  }
}
