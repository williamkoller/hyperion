import envFolderPath, { environments } from '@/config/environments';
import { configService } from '@/infra/typeorm/config/config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFolderPath.folderPath,
      load: [environments],
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
