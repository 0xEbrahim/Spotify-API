import { PlaylistEntity } from 'src/Modules/playlist/entities/playlist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'songs' })
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column()
  name: string;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'varchar', array: true })
  artists: string[];

  @Column({ type: 'text' })
  lyrics: string;

  // Songs can be on one playlist
  @ManyToOne(() => PlaylistEntity)
  playlist: PlaylistEntity;
}
