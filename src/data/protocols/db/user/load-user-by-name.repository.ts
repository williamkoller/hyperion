import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';

export interface LoadUserByNameRepository {
  loadUserByName: (name: string) => Promise<UserEntity>;
}
