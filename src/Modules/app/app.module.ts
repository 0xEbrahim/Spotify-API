import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLogger } from 'src/Common/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SongModuel } from '../song/song.module';
import { PlaylistModuel } from '../playlist/playlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'root',
      database: 'spotify-clone',
      entities: [],
      port: 5432,
      synchronize: true,
      host: 'localhost',
    }),
    UserModule,
    SongModuel,
    PlaylistModuel,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).forRoutes('songs');
  }
}
