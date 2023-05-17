import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from 'jsonwebtoken';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwtrefresh',
) {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async authenticate(request: Request) {
    const refreshToken = request.headers.authorization.split(' ')[1];

    try {
      const payload = await this.jwtService.verify(refreshToken);
      if (payload) {
        const tokenWithUser = await this.authService.refreshToken(
          refreshToken,
          payload,
        );
        if (!tokenWithUser) {
          this.fail(401);
        }
        this.success(tokenWithUser);
      }
    } catch (err) {
      if (
        err instanceof JsonWebTokenError ||
        err instanceof NotBeforeError ||
        err instanceof TokenExpiredError
      ) {
        this.error(new HttpException(err.message, 498));
      }
      this.error(new UnauthorizedException());
    }
  }
}
