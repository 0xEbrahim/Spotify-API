import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private JWTService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findOne(loginDTO);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      const payload = { id: user.id, email: user.email };
      const token = this.JWTService.sign(payload);
      return {
        data: { user: plainToInstance(UserEntity, user) },
        token: token,
      };
    }
    throw new UnauthorizedException('Incorrect email or password.');
  }
}
