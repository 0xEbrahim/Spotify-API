import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  HttpStatus,
  Param,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/Constants/connection';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private readonly connection: Connection,
  ) {
    console.log(this.connection.connectionString);
  }

  @Post('/')
  async createOne(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return await this.songsService.create(createSongDTO);
  }

  @Get('/')
  async findAll(): Promise<Song[]> {
    return await this.songsService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    return await this.songsService.findOne(id);
  }

  @Put('/:id')
  async updateOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.updateOne(id, updateSongDTO);
  }
  @Delete('/:id')
  async deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return await this.songsService.deleteOne(id);
  }
}
