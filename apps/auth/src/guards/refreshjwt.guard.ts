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

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwtrefresh') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const refreshToken = request.headers.authorization.split(' ')[1];
    // return this.authService.validateRefreshToken(refreshToken);
    try {
      const payload = this.jwtService.verify(refreshToken);
      if (payload) return super.canActivate(context);
    } catch (err) {
      if (
        err instanceof JsonWebTokenError ||
        err instanceof NotBeforeError ||
        err instanceof TokenExpiredError
      ) {
        throw new HttpException(err.message, 498);
      }
      throw new UnauthorizedException();
    }
  }

  async verifyJwt(refreshToken: string) {
    const payload = await this.jwtService.verify(refreshToken);
    return payload;
  }
}
