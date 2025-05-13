import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
  async findAll(
    @Optional()
    @Query(
      'page',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    page: number = 1,
    @Optional()
    @Query(
      'limit',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    limit: number = 10,
  ) {
    page = page || 1;
    limit = Math.max(limit, 50) || 10;
    return this.songService.findAll({ page, limit });
  }

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
