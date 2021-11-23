import { AddLogRepository } from '@/data/protocols/db/log';
import { LogEntity } from '@/infra/typeorm/entities/log-entity/log.entity';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddLogParams } from '../types/add-log-params.type';

@EntityRepository(LogEntity)
export class LogsRepository
  extends Repository<LogEntity>
  implements AddLogRepository
{
  public async addLog<T>(addLogParams: T): Promise<LogEntity> {
    const logCreated = Object.assign({}, addLogParams);
    return await this.save(logCreated);
  }
}
