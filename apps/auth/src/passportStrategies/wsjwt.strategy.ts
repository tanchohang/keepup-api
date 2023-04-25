import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      //   passReqToCallback: true,
    });
  }

  async validate(payload: any): Promise<any> {
    const { username } = payload;
    console.log('validating');
    // try {
    //   return this.userRepository.findOneOrFail({ username });
    // } catch (error) {
    // throw new WsException('Unauthorized access');
    // }
  }
}
