import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentService) {}
  // 댓글 생성
  @Post('posts/:postId')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    createCommentDto.postId = postId;
    return this.commentsService.createComment(createCommentDto);
  }
  // 댓글 수정
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, content: string) {
    return this.commentsService.updateComment(id, content);
  }
  // 댓글 삭제
  @Delete('/:comment_id')
  async delete(@Param('comment_id', ParseIntPipe) commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
