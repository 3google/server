import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsRepository } from './posts.repository';
import { CommentsRepository } from 'src/comments/comments.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, CommentsRepository],
  imports: [PrismaModule],
})
export class PostsModule {}
