import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';
import { CreateRecommendDto } from './dto/create-recommend.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  // async createPost(
  //   createPostDto: CreatePostDto,
  //   createRecommendDtos: CreateRecommendDto[],
  // ): Promise<Post> {
  //   const post: Post = await this.prisma.post.create({ data: createPostDto });
  //   if (createRecommendDtos != undefined) {
  //     const datas = [];
  //     for (const recommend of createRecommendDtos) {
  //       datas.push({ postId: post.id, ...recommend });
  //     }
  //     await this.prisma.recommendContent.createMany({
  //       data: datas,
  //     });
  //   }
  //   return post;
  // }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.prisma.post.update({
      where: { id: id },
      data: updatePostDto,
    });
  }

  async findPostsByUser(userId: number) {
    // return await this.prisma.post.findMany({ where: { authorId: userId } });
  }

  async findPostsByQuery(postsQueryDto: FindPostsQueryDto) {
    return await this.prisma.post.findMany({ where: postsQueryDto });
  }

  async deletePostById(id: number) {
    // await this.prisma.post.update({
    //   where: { id: id },
    //   data: { deletedAt: new Date() },
    // });
  }

  async findPostById(id: number) {
    return await this.prisma.post.findUnique({ where: { id: id } });
  }
}
