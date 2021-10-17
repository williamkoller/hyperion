import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { UserOutputType } from '@/modules/users/types/user-output/user-output.type';

export const usersTransformer = (users: UserEntity[]): UserOutputType[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};
