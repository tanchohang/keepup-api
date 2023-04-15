import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Public } from './decorators/jwt.decorator';
import { LocalAuthGuard } from './guards/local.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return { ...req.user, ...(await this.authService.login(req.user)) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return 'user';
  }
}
