import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const user = await this.userRepository.save(userData);
    return plainToInstance(UserEntity, user);
  }

  async findOne(data: Partial<UserEntity>) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) throw new UnauthorizedException('Incorrect email or password.');
    return user;
  }
}
