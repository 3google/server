import { Injectable } from '@nestjs/common';
import { PostDto, RecommendDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { Post } from '@prisma/client';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository) {}

  async createPost(postDto: PostDto): Promise<Post> {
    return await this.postRepository.createPost(postDto);
  }

  async createRecommendContents(
    postId: number,
    recommendContents: RecommendDto,
  ): Promise<void> {
    await this.postRepository.createRecommendContents(
      postId,
      recommendContents,
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

  async deletePostById(id: number) {
    //댓글이랑 추천 컨텐츠도 삭제해야 함
    await this.postRepository.deletePostById(id);
  }

  async findPostById(id: number) {
    return await this.postRepository.findPostById(id);
  }
}
