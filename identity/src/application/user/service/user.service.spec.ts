import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { UserSupportTest } from '../../__test__/support/user.support';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe(UserService.name, () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findByID: jest
              .fn()
              .mockResolvedValue(new UserSupportTest().getEntity()),
            save: jest
              .fn()
              .mockResolvedValue(new UserSupportTest().getEntity()),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`${UserService.prototype.findOne} should return UserDTO when found respective data by ID`, async () => {
    const result = await service.findOne('1');
    expect(repository.findByID).toHaveBeenCalledTimes(1);
    expect(result).toEqual(new UserSupportTest().getEntity());
  });

  it(`${UserService.prototype.findOne} should return NotFoundExcpetion when not found User by ID`, async () => {
    const id = '123';
    repository.findByID = jest.fn().mockResolvedValue(null);
    await expect(service.findOne(id)).rejects.toThrow(
      new NotFoundException(`Usuário com ID ${123} não encontrado`),
    );
    expect(repository.findByID).toHaveBeenCalledTimes(1);
  });

  it(`${UserService.prototype.create} should create user when don't there is user with unique data`, async () => {
    const input = new UserSupportTest().getInput();
    repository.findByUniques = jest.fn().mockResolvedValue(null);

    const result = await service.create(input);
    expect(repository.findByUniques).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result.id).toBe('1');
  });

  it(`${UserService.prototype.create} shouldn't create user when there is user with unique data`, async () => {
    const input = new UserSupportTest().getInput();
    const user = new UserSupportTest().getEntity();
    const users = [user];

    repository.findByUniques = jest.fn().mockResolvedValue(users);

    await expect(service.create(input)).rejects.toThrow(
      new ConflictException(
        `Já existe usuário com esse login ou username cadastrado`,
      ),
    );
  });
});
