import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLogger } from 'src/Common/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SongModuel } from '../song/song.module';
import { PlaylistModuel } from '../playlist/playlist.module';
import { UserEntity } from '../user/entities/user.entity';
import { PlaylistEntity } from '../playlist/entities/playlist.entity';
import { SongEntity } from '../song/entities/song.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'root',
      database: 'spotify-clone',
      entities: [UserEntity, PlaylistEntity, SongEntity],
      port: 5432,
      synchronize: true,
      host: 'localhost',
    }),
    UserModule,
    SongModuel,
    PlaylistModuel,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).forRoutes('songs');
  }
}
