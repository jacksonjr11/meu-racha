import { Injectable } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from 'src/application/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(input: any) {
    const [user] = await this.userService.findByFilter({ login: input.login });
    return {
      access_token: this.jwtService.signAsync(user),
    };
  }
}
