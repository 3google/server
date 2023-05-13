import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Token } from 'src/utils/token';
import { Cookie } from 'src/utils/cookie';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, Token, Cookie, UsersRepository],
})
export class AdminModule {}
