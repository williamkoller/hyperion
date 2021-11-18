import {
  AddUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  DeleteUserByIdRepository,
  LoadUserByNameRepository,
} from '@/data/protocols/db/user';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    DeleteUserByIdRepository,
    LoadUserByNameRepository
{
  public async add(addUserDto: AddUserDto): Promise<UserEntity> {
    const userCreated = Object.assign({} as AddUserDto, addUserDto);
    return await this.save(userCreated);
  }

  public async loadByEmail(email: string): Promise<UserEntity> {
    return await this.createQueryBuilder('users')
      .where('(users.email = :email)', { email })
      .getOne();
  }

  public async loadUserByName(name: string): Promise<UserEntity> {
    return await this.createQueryBuilder('users')
      .where('(users.name ILIKE :name)', { name: `%${name}%` })
      .getOne();
  }

  public async loadById(id: number): Promise<UserEntity> {
    return await this.findOne(id);
  }

  public async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }
}
