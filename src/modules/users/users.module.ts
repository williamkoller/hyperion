import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AddUserService } from './services/add-user/add-user.service';
import { LoadUserByEmailService } from './services/load-user-by-email/load-user-by-email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UsersRepository]),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get<string>('defaultStrategy'),
        property: configService.get<string>('property'),
        session: configService.get<string>('session'),
      }),
    }),
  ],
  providers: [AddUserService, LoadUserByEmailService, BcryptAdapter],
  controllers: [UsersController],
})
export class UsersModule {}
