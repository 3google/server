import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { BookmarkCategoriesService } from './bookmarkCategories.service';
import { CreateBookmarkCategoryDto } from './dto/create-bookmarkCategories.dto';
import { UpdateBookmarkCategoryDto } from './dto/update-bookmarkCategories.dto';
import { FindBookmarkCategoryDto } from './dto/find-bookmarkCategories.dto';
import { BookmarkCategory as BookmarkCategoryModel } from '@prisma/client';

@Controller('/bookmarkCategories')
export class BookmarkCategoriesController {
  constructor(
    private readonly bookmarkCategoriesService: BookmarkCategoriesService,
  ) {}

  //북마크그룹(카테고리) 목록 전체 조회 시
  @Get('/')
  @UsePipes(ValidationPipe)
  async findAll(@Query() bookmarkCategoryQueryDto: FindBookmarkCategoryDto) {
    return await this.bookmarkCategoriesService.findAll(
      bookmarkCategoryQueryDto,
    );
  }

  //북마크 카테고리(그룹) 생성
  @Post('/')
  @UsePipes(ValidationPipe)
  async create(
    @Body() bookmarkCategoryDto: CreateBookmarkCategoryDto,
  ): Promise<BookmarkCategoryModel> {
    const category = await this.bookmarkCategoriesService.create(
      bookmarkCategoryDto,
    );
    return category;
  }

  //북마크 그룹 이름 수정
  @Patch('/:category_id')
  @UsePipes(ValidationPipe)
  async updateBookmarkCategory(
    @Param('category_id') id: number,
    @Body() updateBookmarkCategoryDto: UpdateBookmarkCategoryDto,
  ): Promise<BookmarkCategoryModel> {
    return await this.bookmarkCategoriesService.updateBookmarkCategory(
      Number(id),
      updateBookmarkCategoryDto,
    );
  }

  //북마크 카테고리(그룹) 삭제
  @Delete('/:category_id')
  @UsePipes(ValidationPipe)
  async DeleteBookmarkCategory(@Param('category_id') id: number) {
    return await this.bookmarkCategoriesService.deleteBookmarkCategory(
      Number(id),
    );
  }
}
