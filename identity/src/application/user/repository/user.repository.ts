import { UserInputDTO } from '../dto/user.input';
import { UserFilter } from '../dto/filter-user.dto';
import { UserDTO } from '../dto/user.dto';

export const UserRepository = 'UserRepository';

export interface UserRepository {
  findByID: (id: string) => Promise<UserDTO>;
  save: (input: UserInputDTO) => Promise<UserDTO>;
  update: (id: string, input: UserInputDTO) => Promise<UserDTO>;
  findByUniques: (login: string, username: string) => Promise<UserDTO[]>;
  findByFilter: (filter: UserFilter) => Promise<UserDTO[]>;
}
