import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: configService.get('expiresIn'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    BcryptAdapter,
    JwtAdapter,
    LoadUserByEmailService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
