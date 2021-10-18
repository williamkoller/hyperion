import envFolderPath, { environments } from '@/config/environments';
import { configService } from '@/infra/typeorm/config/config.service';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFolderPath.folderPath,
      load: [environments],
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
