import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { UserDTO } from 'src/application/user/dto/user.dto';

@Injectable()
export class JwtService {
  constructor(private readonly service: Jwt) {}

  async signAsync(user: UserDTO): Promise<string> {
    const payload = this.generateToken(user);
    return await this.service.signAsync(payload);
  }

  async verifyAsync(token: string) {
    return await this.service.verifyAsync(token, {
      secret: 'sharizard',
    });
  }

  public generateToken(user: UserDTO) {
    return {
      sub: user.id,
      username: user.username,
    };
  }
}
