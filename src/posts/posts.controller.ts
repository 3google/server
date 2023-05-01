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
  ): Promise<PostModel> {
    console.log(postDto);
    const post = await this.postsService.createPost(postDto, recommendDtos);
    return post;
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
