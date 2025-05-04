import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;
    const songs = await this.songRepository.findByIds(playlistDTO.songs);
    playlist.songs = songs;
    const user = await this.userRepository.findOneBy({
      id: playlistDTO.user,
    });
    if (!user) {
      throw new Error('User not found');
    }
    playlist.user = user;
    await this.playlistRepository.save(playlist);
    return playlist;
  }
}
