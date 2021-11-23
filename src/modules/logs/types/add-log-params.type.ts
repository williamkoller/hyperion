import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { Payload } from '../interfaces/payload.interface';

export type AddLogParams = {
  payload: Payload<UserEntity>;
};
