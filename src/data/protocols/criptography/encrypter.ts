import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';

export interface Encrypter {
  encrypt: (user: UserEntity) => Promise<string>;
}
