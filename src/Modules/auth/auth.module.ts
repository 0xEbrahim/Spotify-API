import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import configuration from 'src/Common/config/configuration';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [UserModule, JwtModule.register(configuration().jwt)],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
