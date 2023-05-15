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
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BoardType, Emotion } from '@prisma/client';

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
    const comment =  this.commentsService.createComment(createCommentDto);
    return {
      data : comment, 
      message : '댓글이 정상적으로 저장되었습니다'
    }
  }
  // 댓글 수정
  @Patch('/:commentId')
  async update(@Param('commentId', ParseIntPipe) commentId: number, content: string) {
    const comment = this.commentsService.updateComment(commentId, content);
    return { 
      data : comment, 
      message : '댓글이 정상적으로 수정되었습니다'
    }
  }
  // 댓글 삭제
  @Delete('/:comment_id')
  async delete(@Param('comment_id', ParseIntPipe) commentId: number) {
    const comment = this.commentsService.deleteComment(commentId);
    return { 
      comment,
    }
  }


  // 마이페이지 >  사용자 작성 댓글 목록 조회
  @Get('/:userId')
  async findCommentById(@Param('userId', ParseIntPipe) userId : number){
    const comment = this.commentsService.findCommentById(userId);
    return { 
      data : comment, 
      message : '유저의 댓글이 정상적으로 조회되었습니다'
    };

  }

  // 마이페이지 > 댓글 삭제 
  @Delete('/:commentId')
  async deleteCommentById(@Param('commentId', ParseIntPipe) id: number) {
    const message = await this.commentsService.deleteComment(id);
    return { 
      message, 
    }
  }

  // 관리자 > 전체 댓글 조회
  @Get('/')
  async findCommentByAdmin(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('boardType') boardType: BoardType,
    @Query('emotions') emotions: Emotion){
      return this.commentsService.findCommentByAdmin(userId, boardType, emotions);

  }    

  // 관리자 > 댓글 삭제
  @Delete('/:commentId')
  async deleteCommentByAdmin(@Param('commentId', ParseIntPipe) id: number) {
    const message = await this.commentsService.deleteCommentByAdmin(id);
  }

}
