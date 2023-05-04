import { Module } from '@nestjs/common';
import { BookmarkCategoriesController } from './bookmarkCategories.controller';
import { BookmarkCategoriesService } from './bookmarkCategories.service';
import { BookmarkCategoryRepository } from './bookmarkCategories.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookmarkCategoriesController],
  providers: [BookmarkCategoriesService, BookmarkCategoryRepository],
  imports:[PrismaModule]
})
export class BookmarkCategoriesModule {}
