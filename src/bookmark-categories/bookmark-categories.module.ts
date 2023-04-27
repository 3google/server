import { Module } from '@nestjs/common';
import { BookmarkCategoriesController } from './bookmark-categories.controller';
import { BookmarkCategoriesService } from './bookmark-categories.service';

@Module({
  controllers: [BookmarkCategoriesController],
  providers: [BookmarkCategoriesService]
})
export class BookmarkCategoriesModule {}
