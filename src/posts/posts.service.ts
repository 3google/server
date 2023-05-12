import { HttpStatus, Injectable } from '@nestjs/common';
import { PostDto, RecommendDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { Post } from '@prisma/client';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';
import { CommentsRepository } from 'src/comments/comments.repository';
import { errorHandler } from 'src/middleware/errorHandler';

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
  ) {}

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
    const posts = await this.postRepository.findPostsByQuery(postsQueryDto);
    for (const post of posts) {
      if (post.author.deletedAt) {
        post.author.nickname = '삭제된 사용자';
      }
    }
    return posts;
  }

  async deletePostById(id: number) {
    if ((await this.postRepository.findPostById(id)) == null) {
      errorHandler(
        '게시글이 삭제에 실패했습니다.',
        '해당 게시글이 존재하지 않습니다.',
      );
    }
    const [isDeleted, deletedComments] = await Promise.all([
      this.postRepository.deletePostById(id),
      this.commentsRepository.deleteCommentsByPostId(id),
    ]);
    if (isDeleted !== null) {
      return '정상적으로 게시글이 삭제되었습니다.';
    }
  }

  async findPostById(id: number) {
    const [post, comments] = await Promise.all([
      this.postRepository.findPostById(id),
      this.commentsRepository.findCommentsByPostId(id),
    ]);
    if (post.author.deletedAt) {
      post.author.nickname = '삭제된 사용자';
    }
    for (const comment of comments) {
      if (comment.author.deletedAt) {
        comment.author.nickname = '삭제된 사용자';
      }
    }
    return { post, comments };
  }
}
