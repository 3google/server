import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({ data: createPostDto });
  }
}
