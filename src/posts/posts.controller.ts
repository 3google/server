import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from '@prisma/client';
import { CreateRecommendDto } from './dto/create-recommend.dto';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';
import { errorHandler } from 'src/middleware/errorHandler';
import { HttpStatusCode } from 'axios';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPost(
    @Body('post')
    postDto: CreatePostDto,
    @Body('recommendContents')
    recommendDtos: CreateRecommendDto[],
  ): Promise<{ data: PostModel; message: string }> {
    // 에러 작성 방법 middleware의 errorHandler.ts에서 아래 함수 임포트해서 사용 매개변수 중 상태코드는 생략 가능
    // 상태코드 기본값 400 BadRequest
    errorHandler('error Name', 'error description', HttpStatusCode.BadRequest);
    const post = await this.postsService.createPost(postDto, recommendDtos);
    return { data: post, message: '게시글이 정상적으로 저장되었습니다.' };
  }

  @Patch('/:postId')
  @UsePipes(ValidationPipe)
  async updatePost(
    @Param('postId') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return await this.postsService.updatePost(Number(id), updatePostDto);
  }

  @Get('/user')
  async findPostsByUser() {
    const userId = 3; // 토큰에서 불러오기
    return await this.postsService.findPostsByUser(userId);
  }

  @Get('/')
  @UsePipes(ValidationPipe)
  async findPosts(@Query() postsQueryDto: FindPostsQueryDto) {
    return await this.postsService.findPostsByQuery(postsQueryDto);
  }

  @Get('/:postId')
  async findPostById(@Param('postId') id: number) {
    return await this.postsService.findPostById(id);
  }

  @Delete('/:postId')
  async deletePostById(@Param('postId') id: number) {
    return await this.postsService.deletePostById(Number(id));
  }
}
