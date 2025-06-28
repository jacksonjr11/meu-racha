import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from '../service/authentication/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
