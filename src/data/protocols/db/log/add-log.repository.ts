import { LogEntity } from '@/infra/typeorm/entities/log-entity/log.entity';
import { AddLogParams } from '@/modules/logs/types/add-log-params.type';

export interface AddLogRepository {
  addLog: (addLogParams: AddLogParams) => Promise<LogEntity>;
}
