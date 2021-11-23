import { LogEntity } from '@/infra/typeorm/entities/log-entity/log.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsRepository } from './repositories/logs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogsRepository, LogEntity])],
})
export class LogsModule {}
