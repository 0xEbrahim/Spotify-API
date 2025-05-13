import { SongEntity } from 'src/Modules/song/entities/song.entity';
import { UserEntity } from 'src/Modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // User can have many playlists
  // Play list is created by one user
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  // Playlist can have many songs
  @OneToMany(() => SongEntity, (song: SongEntity) => song.playlist)
  songs: SongEntity[];
}
