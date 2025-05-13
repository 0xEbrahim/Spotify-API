import { Exclude } from 'class-transformer';
import { AbstractedEntity } from 'src/Common/entities/entity';
import { PlaylistEntity } from 'src/Modules/playlist/entities/playlist.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractedEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  // User can have many playlists
  @OneToMany(() => PlaylistEntity, (playList: PlaylistEntity) => playList.user)
  playlists: PlaylistEntity[];
}
