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
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { FindBookmarkDto } from './dto/find-bookmark.dto';
import { Bookmark as BookmarkModel } from '@prisma/client';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  //북마크 추가
  @Post('/')
  @UsePipes(ValidationPipe)
  async create(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkModel> {
    const bookmark = await this.bookmarksService.create(createBookmarkDto);
    return bookmark;
  }

  //북마크 카테고리별 목록 조회 시 //수정예정.
  @Get('/category/:category_id')
  @UsePipes(ValidationPipe)
  find(@Query() findBookmarkDto: FindBookmarkDto) {
    return this.bookmarksService.find(findBookmarkDto);
  }

  //북마크 해제
  @Delete('/:bookmark_id')
  @UsePipes(ValidationPipe)
  async DeleteBookmark(@Param('bookmark_id') Id: number) {
    return await this.bookmarksService.deleteBookmark(Number(Id));
  }
}
