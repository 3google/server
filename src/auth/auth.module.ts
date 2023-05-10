import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/users/users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Token } from 'src/utils/token';
import { UsersService } from 'src/users/users.service';
import { Cookie } from 'src/utils/cookie';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, UsersService, Token, Cookie],
})
export class AuthModule {}
