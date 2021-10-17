import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';

export interface AddUserRepository {
  add: (addUserDto: AddUserDto) => Promise<UserEntity>;
}
