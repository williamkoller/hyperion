import {
  AddUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  DeleteUserByIdRepository,
  LoadUserByNameRepository,
  UpdateUserRepository,
  LastLoggedRepository,
} from '@/data/protocols/db/user';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    DeleteUserByIdRepository,
    LoadUserByNameRepository,
    UpdateUserRepository,
    LastLoggedRepository
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

  public async updateUser(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userUpdated = this.merge(user, { ...updateUserDto });
    return await this.save(userUpdated);
  }

  public async lastLogged(id: number, lastLogged: Date): Promise<void> {
    return await this.query(
      `UPDATE "users" SET "last_logged" = $2 WHERE id = $1`,
      [id, lastLogged],
    );
  }
}
