import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto, RecommendDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  async createPost(postDto: PostDto): Promise<Post> {
    const post: Post = await this.prisma.post.create({ data: postDto });
    return post;
  }

  async createRecommendContents(
    postId: number,
    recommendContents: RecommendDto,
  ): Promise<void> {
    const movies = [];
    const musics = [];
    const books = [];
    for (const movieId of recommendContents.movies) {
      movies.push({ postId, movieId });
    }
    for (const musicId of recommendContents.musics) {
      movies.push({ postId, musicId });
    }
    for (const bookId of recommendContents.books) {
      movies.push({ postId, bookId });
    }
    await Promise.all([
      this.prisma.recommendContent.createMany({ data: movies }),
      this.prisma.recommendContent.createMany({ data: musics }),
      this.prisma.recommendContent.createMany({ data: books }),
    ]);
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.prisma.post.update({
      where: { id: id },
      data: updatePostDto,
    });
  }

  async findPostsByUser(userId: number) {
    return await this.prisma.post.findMany({ where: { authorId: userId } });
  }

  async findPostsByQuery(postsQueryDto: FindPostsQueryDto) {
    return await this.prisma.post.findMany({
      where: postsQueryDto,
      include: { author: true },
    });
  }

  async deletePostById(id: number) {
    return await this.prisma.post.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });
  }

  async findPostById(id: number) {
    return await this.prisma.post.findUnique({
      where: { id: id },
      include: { author: true },
    });
  }
}
