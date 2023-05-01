import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { Post } from '@prisma/client';
import { CreateRecommendDto } from './dto/create-recommend.dto';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository) {}

  async createPost(
    createPostDto: CreatePostDto,
    createRecommendDtos: CreateRecommendDto[],
  ): Promise<Post> {
    return await this.postRepository.createPost(
      createPostDto,
      createRecommendDtos,
    );
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.postRepository.updatePost(id, updatePostDto);
  }

  async findPostsByUser(userId: number) {
    return await this.postRepository.findPostsByUser(userId);
  }

  async findPostsByQuery(postsQueryDto: FindPostsQueryDto) {
    return await this.postRepository.findPostsByQuery(postsQueryDto);
  }
}
