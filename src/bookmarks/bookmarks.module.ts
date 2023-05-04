import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksRepository } from './bookmarks.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookmarksController],
  providers: [BookmarksService, BookmarksRepository],
  imports:[PrismaModule]
})
export class BookmarksModule {}
