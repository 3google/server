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

  @Patch('/:post_id')
  @UsePipes(ValidationPipe)
  async updatePost(
    @Param('post_id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return await this.postsService.updatePost(Number(id), updatePostDto);
  }

  @Get('/user')
  async findPostsByUser() {
    const userId = 4; // 토큰에서 불러오기
    return await this.postsService.findPostsByUser(userId);
  }

  @Get('/')
  @UsePipes(ValidationPipe)
  async findPosts(@Query() postsQueryDto: FindPostsQueryDto) {
    return await this.postsService.findPostsByQuery(postsQueryDto);
  }
}
