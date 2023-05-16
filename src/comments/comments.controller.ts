import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BoardType, Emotion } from '@prisma/client';

@Controller('api/comments')
export class CommentsController {
  constructor(private commentsService: CommentService) {}
  // 댓글 생성
  @Post('posts/:postId')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    // 유효성 검사
    const { content } = createCommentDto;
    if (!content) {
      throw new HttpException(
        '댓글 내용이 필요합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    createCommentDto.postId = postId;
    const comment = await this.commentsService.createComment(createCommentDto);

    return {
      data: comment,
      message: '댓글이 정상적으로 저장되었습니다.',
    };
  }

  // 댓글 수정
  @Patch('/:commentId')
  async update(
    @Param('commentId', ParseIntPipe) commentId: number,
    content: string,
  ) {
    const comment = this.commentsService.updateComment(commentId, content);
    return {
      data: comment,
      message: '댓글이 정상적으로 수정되었습니다',
    };
  }
  // 댓글 삭제
  @Delete('/:comment_id')
  async delete(@Param('comment_id', ParseIntPipe) commentId: number) {
    try {
      const comment = await this.commentsService.deleteComment(commentId);
      return {
        comment,
      };
    } catch (error) {
      console.error(`Failed to delete comment: ${error}`);
      throw new HttpException(
        'Failed to delete comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 마이페이지 >  사용자 작성 댓글 목록 조회
  @Get('/:authorId')
  async findCommentById(@Param('authorId', ParseIntPipe) authorId: number) {
    try {
      if (!authorId) {
        throw new HttpException(
          '작성자 ID가 필요합니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const comments = await this.commentsService.findCommentById(authorId);
      return {
        data: comments,
        message: '유저의 댓글이 정상적으로 조회되었습니다.',
      };
    } catch (error) {
      console.error(`Failed to find user's comments: ${error}`);
      throw new HttpException(
        '댓글 조회에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 마이페이지 > 댓글 삭제
  @Delete('/user/:commentId')
  async deleteCommentById(@Param('commentId', ParseIntPipe) id: number) {
    try {
      const existingComment = await this.commentsService.findCommentById(id);

      if (!existingComment) {
        throw new HttpException(
          '삭제할 댓글이 존재하지 않습니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const message = await this.commentsService.deleteComment(id);
      return {
        message,
      };
    } catch (error) {
      console.error(`Failed to delete comment: ${error}`);
      throw new HttpException(
        '댓글 삭제에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 관리자 > 전체 댓글 조회
  @Get('/')
  async findCommentByAdmin(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('boardType') boardType: BoardType,
    @Query('emotions') emotions: Emotion,
  ) {
    try {
      if (userId && typeof userId !== 'number') {
        throw new HttpException(
          '유효하지 않은 사용자 ID입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // 나머지 유효성 검사 로직

      return this.commentsService.findCommentByAdmin(
        userId,
        boardType,
        emotions,
      );
    } catch (error) {
      console.error(`Failed to retrieve comments by admin: ${error}`);
      throw new HttpException(
        '댓글 조회에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 관리자 > 댓글 삭제
  @Delete('/:commentId')
  async deleteCommentByAdmin(@Param('commentId', ParseIntPipe) id: number) {
    try {
      if (!id) {
        throw new HttpException(
          '댓글 ID가 필요합니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingComment = await this.commentsService.findCommentById(id);

      if (!existingComment) {
        throw new HttpException(
          '삭제할 댓글이 존재하지 않습니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const message = await this.commentsService.deleteCommentByAdmin(id);
      return { message };
    } catch (error) {
      console.error(`Failed to delete comment by admin: ${error}`);
      throw new HttpException(
        '댓글 삭제에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
