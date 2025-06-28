import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserInputDTO } from '../dto/user.input';
import { UserFilter } from '../dto/filter-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findByFilter(filter: UserFilter): Promise<UserDTO[]> {
    return this.userRepository.findByFilter(filter);
  }

  async findOne(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findByID(id);

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async create(input: UserInputDTO): Promise<UserDTO> {
    try {
      await this.validationIfHasUserWithUnique({
        login: input.login,
        username: input.username,
      });

      const result = await this.userRepository.save(input);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, input: UserInputDTO): Promise<UserDTO> {
    try {
      const user = await this.userRepository.findByID(id);
      this.validationIfHasUserWithUnique({
        login: input.login,
        username: input.username,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async validationIfHasUserWithUnique(uniques: {
    login: string;
    username: string;
  }): Promise<void> {
    const user = await this.userRepository.findByUniques(
      uniques.login,
      uniques.username,
    );

    if (user) {
      throw new ConflictException(
        `Já existe usuário com esse login ou username cadastrado`,
      );
    }
  }
}
