import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDTO } from './dtos/create-song.dto';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post('/')
  async create(createSongDTO: CreateSongDTO) {
    return this.songService.create(createSongDTO);
  }

  @Get('/')
  async findAll() {}

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.songService.findOne(id);
  }
}
