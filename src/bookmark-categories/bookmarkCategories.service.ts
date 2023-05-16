import { Injectable } from '@nestjs/common';
import { CreateBookmarkCategoryDto } from './dto/create-bookmarkCategories.dto';
import { BookmarkCategoryRepository } from './bookmarkCategories.repository';
import { FindBookmarkCategoryDto } from './dto/find-bookmarkCategories.dto';
import { UpdateBookmarkCategoryDto } from './dto/update-bookmarkCategories.dto';
import { BookmarkCategory } from '@prisma/client';

@Injectable()
export class BookmarkCategoriesService {
  constructor(private bookmarkCategoryRepository: BookmarkCategoryRepository){}
  

  async findAll(bookmarkCategoryQueryDto: FindBookmarkCategoryDto) {
    return await this.bookmarkCategoryRepository.findAll(bookmarkCategoryQueryDto)

  }

  async create(bookmarkCategoryDto: CreateBookmarkCategoryDto):Promise<BookmarkCategory>{
    return await this.bookmarkCategoryRepository.create(bookmarkCategoryDto);
  }

  async updateBookmarkCategory(id: number, updateBookmarkCategoryDto: UpdateBookmarkCategoryDto): Promise<BookmarkCategory> {
    return await this.bookmarkCategoryRepository.updateBookmarkCategory(id, updateBookmarkCategoryDto);
  }
  async deleteBookmarkCategory(id: number){
    return await this.bookmarkCategoryRepository.deleteBookmarkCategory(id);
  }
}
