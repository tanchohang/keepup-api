import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwtrefresh',
) {
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<any> {
    const refreshToken = request.headers.authorization.split(' ')[1];
    const tokenWithUser = await this.authService.validateRefreshToken(
      refreshToken,
      payload.sub,
    );
    if (!tokenWithUser) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.authService.createAccessToken({
      username: payload.username,
      sub: payload.sub,
    });
    return { accessToken };
  }

  //   private static extractJWT(req: RequestType): string | null {
  //     if (req.body.refresh_token) {
  //       return req.body.refresh_token;
  //     }
  //     return null;
  //   }
}
