import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';

export interface LoadUserByIdRepository {
  loadById: (id: number) => Promise<UserEntity>;
}
