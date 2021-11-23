import { Payload } from '@/modules/logs/interfaces/payload.interface';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity/base-entity';

@Entity('logs')
export class LogEntity extends BaseEntity {
  @Column({ type: 'json', nullable: false })
  payload: Payload<any>;

  constructor(partial: Partial<LogEntity>) {
    super();
    Object.assign(this, partial);
  }
}
