import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { JwtService as Jwt } from '@nestjs/jwt';
import { UserSupportTest } from '../../../__test__/support/user.support';

describe(JwtService.name, () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService, Jwt],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return Token object', () => {
    const user = new UserSupportTest().getEntity();
    expect(service.generateToken(user)).toEqual({
      sub: user.id,
      username: user.username,
    });
  });
});
