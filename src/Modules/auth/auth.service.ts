import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findOne(loginDTO);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      return plainToInstance(UserEntity, user);
    }
    throw new UnauthorizedException('Incorrect email or password.');
  }
}
