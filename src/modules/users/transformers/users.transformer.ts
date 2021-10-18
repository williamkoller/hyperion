import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { UserOutputType } from '@/modules/users/types/user-output/user-output.type';
import { validatorDate } from '@/validator/validator-date/validator-date';

export const usersTransformer = (users: UserEntity[]): UserOutputType[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};

export const userTransformer = (user: UserEntity): UserOutputType => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    createdAt: validatorDate(user.createdAt),
    updatedAt: validatorDate(user.updatedAt),
  };
};
