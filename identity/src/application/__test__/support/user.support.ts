import { UserInputDTO } from 'src/application/user/dto/create-user.dto';
import { UserDTO } from 'src/application/user/dto/user.dto';

export class UserSupportTest {
  getEntity(): UserDTO {
    return {
      id: '1',
      username: 'Eliane',
      login: 'Souza',
      password: '123',
    };
  }

  getInput(): UserInputDTO {
    return {
      login: 'eliane',
      password: '123',
      username: 'eliane.souza',
      socialName: 'Eliane Souza',
      personId: '1',
    };
  }
}
