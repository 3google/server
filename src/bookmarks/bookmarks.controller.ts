import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { FindBookmarkDto } from './dto/find-bookmark.dto';
import { Bookmark as BookmarkModel } from '@prisma/client';
import { errorHandler } from 'src/middleware/errorHandler';

@Controller('api/bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  //북마크 추가
  @Post('/')
  @UsePipes(ValidationPipe)
  async create(@Body() createBookmarkDto: CreateBookmarkDto) {
    const bookmark = await this.bookmarksService.create(createBookmarkDto);
    return { data: bookmark, message: '북마크가 정상적으로 추가되었습니다.' };
  }

  //북마크 카테고리별 목록 조회 시
  @Get('/category/:category_id')
  @UsePipes(ValidationPipe)
  async find(@Param('category_id') categoryId: number) {
    try {
      const bookmark = await this.bookmarksService.findByCategoryId(
        Number(categoryId),
      );
      return { data: bookmark, message: '북마크가 정상적으로 조회되었습니다.' };
    } catch (e) {
      console.log(e.message);
      throw new NotFoundException();
    }
    errorHandler('북마크 조회 실패', '등록된 북마크가 없습니다');
  }

  //북마크 해제
  @Delete('/:bookmark_id')
  @UsePipes(ValidationPipe)
  async DeleteBookmark(@Param('bookmark_id') Id: number) {
    const bookmark = await this.bookmarksService.deleteBookmark(Number(Id));
    return { data: bookmark, message: '북마크가 정상적으로 해제되었습니다.' };
  }
}
