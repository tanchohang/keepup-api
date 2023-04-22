import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Public } from './decorators/jwt.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshAuthGuard } from './guards/refreshjwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return { ...req.user, ...(await this.authService.login(req.user)) };
  }
  @Public()
  @UseGuards(RefreshAuthGuard)
  @Get('refresh')
  async refresh(@Request() req): Promise<any> {
    const { ...user } = req.user;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return 'user';
  }

  @Delete('logout')
  async logout(@Request() req) {
    return this.authService.deleteRefreshToken(req.user.id);
  }
}
