import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { FindBookmarkDto } from './dto/find-bookmark.dto';
import { Bookmark } from '@prisma/client';

@Injectable()
export class BookmarksRepository {
  constructor(private prisma: PrismaService) {}

  async create(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    return await this.prisma.bookmark.create({ data: createBookmarkDto });
  }

  async find(findBookmarkDto: FindBookmarkDto) {
    return await this.prisma.bookmarkCategory.findMany({
      where: findBookmarkDto,
    });
  }

  async deleteBookmark(Id: number) {
    return await this.prisma.bookmark.update({
      where: { id: Id },
      data: { deletedAt: new Date() },
    });
  }
}
