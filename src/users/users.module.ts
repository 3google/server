import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Token } from 'src/utils/token';
import { Cookie } from 'src/utils/cookie';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, Token, Cookie],
  exports: [UsersRepository],
})
export class UsersModule {}
