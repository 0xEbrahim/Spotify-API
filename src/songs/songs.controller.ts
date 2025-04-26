import { Controller, Delete, Get, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  @Get('/')
  findAll(): string {
    return 'Hello';
  }

  @Get('/:id')
  findOne(): string {
    return 'One song';
  }

  @Put('/:id')
  updateOne(): string {
    return 'Updated';
  }
  @Delete('/:id')
  deleteOne(): string {
    return 'Deleted';
  }
}
