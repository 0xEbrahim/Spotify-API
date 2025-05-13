import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.UserService.create(createUserDTO);
  }
}
