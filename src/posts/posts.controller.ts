import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from '@prisma/client';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body()
    datas: CreatePostDto,
  ): Promise<{ data: PostModel; message: string }> {
    const post = await this.postsService.createPost(datas.post);
    await this.postsService.createRecommendContents(
      post.id,
      datas.recommendContents,
    );
    return { data: post, message: '게시글이 정상적으로 저장되었습니다.' };
  }

  @Patch('/:postId')
  async updatePost(
    @Param('postId') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<{ data: PostModel; message: string }> {
    const post = await this.postsService.updatePost(Number(id), updatePostDto);
    return { data: post, message: '게시글이 정상적으로 수정되었습니다.' };
  }

  @Get('/user')
  async findPostsByUser() {
    const userId = 3; // 토큰에서 불러오기
    const posts = await this.postsService.findPostsByUser(userId);
    return {
      data: posts,
      message: '사용자가 작성한 게시글이 정상적으로 조회되었습니다.',
    };
  }

  @Get('/')
  async findPosts(@Query() postsQueryDto: FindPostsQueryDto) {
    const posts = await this.postsService.findPostsByQuery(postsQueryDto);
    return {
      data: posts,
      message: '게시글 목록이 정상적으로 조회되었습니다.',
    };
  }

  @Get('/:postId')
  async findPostById(@Param('postId') id: number) {
    const post = await this.postsService.findPostById(id);
    return {
      data: post,
      message: '게시글 상세 정보가 정상적으로 조회되었습니다.',
    };
  }

  @Delete('/:postId')
  async deletePostById(@Param('postId') id: number) {
    const message = await this.postsService.deletePostById(Number(id));
    return {
      message,
    };
  }
}
