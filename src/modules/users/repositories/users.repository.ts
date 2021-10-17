import { AddUserRepository } from '@/data/protocols/db/user';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements AddUserRepository
{
  public async add(addUserDto: AddUserDto): Promise<UserEntity> {
    const userCreated = Object.assign({} as AddUserDto, addUserDto);
    return await this.save(userCreated);
  }
}
