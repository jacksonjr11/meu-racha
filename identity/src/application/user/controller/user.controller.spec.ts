import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';

describe(UserController.name, () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: '1', name: 'Eliane' }),
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Eliane' }),
            update: jest.fn().mockResolvedValue({ id: '1', name: 'Eliane' }),
            remove: jest.fn(),
            findByFilter: jest
              .fn()
              .mockResolvedValue([{ id: '1', name: 'Eliane' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`#${UserController.prototype.findOne.name} - should call ${UserService.prototype.findOne.name} method and return respective ID`, async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ id: '1', name: 'Eliane' });
    expect(service.findOne).toHaveBeenCalledTimes(1);
  });

  it(`#${UserController.prototype.findAll.name} - should call ${UserService.prototype.findByFilter.name} method`, async () => {
    await controller.findAll({ login: 'teste' });
    expect(service.findByFilter).toHaveBeenCalledTimes(1);
  });

  it(`#${UserController.prototype.create.name} - should call ${UserService.prototype.create.name} method`, async () => {
    const input = {};
    const result = await controller.create(input);
    expect(result).toEqual({ id: '1', name: 'Eliane' });
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it(`#${UserController.prototype.update.name} - should call ${UserService.prototype.update.name} method`, async () => {
    const input = {};
    const result = await controller.update('1', input);
    expect(result).toEqual({ id: '1', name: 'Eliane' });
    expect(service.update).toHaveBeenCalledTimes(1);
  });
});
