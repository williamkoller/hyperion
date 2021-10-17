import envFolderPath, { environments } from '@/config/environments';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFolderPath.folderPath,
      load: [environments],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
