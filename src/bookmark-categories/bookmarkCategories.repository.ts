import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkCategoryDto} from './dto/create-bookmarkCategories.dto';
import { FindBookmarkCategoryDto } from './dto/find-bookmarkCategories.dto';
import { UpdateBookmarkCategoryDto } from './dto/update-bookmarkCategories.dto';
import { BookmarkCategory } from '@prisma/client';

@Injectable()
export class BookmarkCategoryRepository{
  constructor(private prisma: PrismaService){}

  async findAll(bookmarkCategoryQueryDto: FindBookmarkCategoryDto){
    return await this.prisma.bookmarkCategory.findMany({where: {deletedAt: null}||bookmarkCategoryQueryDto})
  }

  async create(bookmarkCategoryDto: CreateBookmarkCategoryDto):Promise<BookmarkCategory>{
    return await this.prisma.bookmarkCategory.create({data: bookmarkCategoryDto });
  }

  async updateBookmarkCategory(id:number, updateBookmarkCategoryDto: UpdateBookmarkCategoryDto):Promise<BookmarkCategory>{
    return await this.prisma.bookmarkCategory.update({
      where: {id:id},
      data: updateBookmarkCategoryDto
    });
  }

  async deleteBookmarkCategory(id:number){
    return await this.prisma.bookmarkCategory.delete({
      where: {id:id}
    });
  }
}

