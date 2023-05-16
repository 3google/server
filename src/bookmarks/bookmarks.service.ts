import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { FindBookmarkDto } from './dto/find-bookmark.dto';
import { BookmarksRepository } from './bookmarks.repository';
import { Bookmark } from '@prisma/client';

@Injectable()
export class BookmarksService {
  constructor(private bookmarksRepository: BookmarksRepository){}

  async create(createBookmarkDto: CreateBookmarkDto):Promise<Bookmark> {
    return await this.bookmarksRepository.create(createBookmarkDto);
  }

  async findByCategoryId(categoryId: number) {
    return await this.bookmarksRepository.findByCategoryId(categoryId);
  }

  async deleteBookmark(Id:number){
    return await this.bookmarksRepository.deleteBookmark(Id);
  }
}
