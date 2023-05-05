import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentService, CommentsRepository],
  imports: [PrismaModule],
})
export class CommentsModule {}
