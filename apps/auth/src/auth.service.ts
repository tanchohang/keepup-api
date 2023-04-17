import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'apps/keepup/src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
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
}
