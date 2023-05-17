import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwtrefresh') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request: Request = context.switchToHttp().getRequest();
    return super.canActivate(new ExecutionContextHost([request]));
  }
}
