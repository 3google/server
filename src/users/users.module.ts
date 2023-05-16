import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Token } from 'src/utils/token';
import { Cookie } from 'src/utils/cookie';
import { PostsService } from 'src/posts/posts.service';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentsRepository } from 'src/comments/comments.repository';
// import { FileService } from 'src/file/file.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from 'src/utils/multer.options';

@Module({
  imports: [
    PrismaModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    Token,
    Cookie,
    PostsService,
    PostsRepository,
    CommentsRepository,
    // FileService,
  ],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
