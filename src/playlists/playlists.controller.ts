import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post('/')
  async create(@Body() playlistDTO: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistsService.create(playlistDTO);
  }
}
