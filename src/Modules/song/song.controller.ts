import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDTO } from './dtos/create-song.dto';
import { UpdateSongDTO } from './dtos/update-song.dto';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post('/')
  async create(@Body() createSongDTO: CreateSongDTO) {
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

  @Put('/:id')
  async updateOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ) {
    return this.songService.updateOne(id, updateSongDTO);
  }

  @Delete('/:id')
  async deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.songService.deleteOne(id);
  }
}
