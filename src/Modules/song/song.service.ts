import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './dtos/create-song.dto';
import { UpdateSongDTO } from './dtos/update-song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  async create(songData: CreateSongDTO) {
    const song = await this.songRepository.save(songData);
    return song;
  }

  async findAll() {}
  async findOne(id: number) {
    const song = await this.songRepository.findBy({ id: id });
    return song;
  }
  async updateOne(id: number, songData: UpdateSongDTO) {
    const song = await this.songRepository.update({ id: id }, songData);
    return song;
  }

  async deleteOne(id: number) {
    return await this.songRepository.delete({ id: id });
  }
}
