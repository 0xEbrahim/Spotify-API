import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.UserService.create(createUserDTO);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return 'ddd';
  }
}
