import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'apps/keepup/src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './entities/token.entities';
import { Model } from 'mongoose';
import { User } from 'apps/keepup/src/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,

    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
  ) {}

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(user: any) {
    const access_token = await this.createAccessToken({
      username: user.username,
      sub: user.id,
    });
    const refresh_token = await this.createRefreshToken({
      username: user.username,
      sub: user.id,
    });
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && (await user.comparePassword(pass))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async validateRefreshToken(
    refreshToken: string,
    uid: string,
  ): Promise<boolean> {
    const tokenWithUser = (
      await this.tokenModel.findOne({ user: uid })
    ).populate({ path: 'user', model: this.userModel });

    if (tokenWithUser && refreshToken === (await tokenWithUser).refreshToken)
      return true;
    return false;
  }

  async createAccessToken(payload: any) {
    return await this.jwtService.sign(payload, { expiresIn: '900s' });
  }

  async createRefreshToken(payload: any): Promise<any> {
    const refresh_token = await this.jwtService.sign(
      payload,

      { expiresIn: '4h' },
    );
    const token = await this.tokenModel.findOne({ user: payload.sub });
    if (token) {
      return token.refreshToken;
    }

    const storedRefreshToken = await this.tokenModel.create({
      refreshToken: refresh_token,
      user: payload.sub,
    });
    return storedRefreshToken.refreshToken;
  }

  async deleteRefreshToken(userId: string) {
    return await this.tokenModel.deleteOne({ user: userId });
  }
}
