import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<UserEntity>;
}
