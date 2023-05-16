import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BoardType, Emotion } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private commentsRepository: CommentsRepository) {}
  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto) {
    return await this.commentsRepository.createComment(createCommentDto);
  }

  // 댓글 업데이트
  async updateComment(commentId: number, content: string) {
    return await this.commentsRepository.updateComment(commentId, content);
  }

  // 댓글 삭제
  async deleteComment(commentId: number) {
    return await this.commentsRepository.deleteComment(commentId);
  }

  // 유저 > 댓글 조회 
  async findCommentById(authorId : number) {
    return await this.commentsRepository.findCommentById(authorId);
  }

  // 유저 > 댓글 삭제 
  async deleteCommentById(id: number) { 
    return await this.commentsRepository.deleteCommentById(id);
  }

  // 관리자 > 전체 댓글 조회
  async findCommentByAdmin(userId: number, boardType: BoardType, emotions: Emotion){
    return await this.commentsRepository.findCommentByAdmin(userId, boardType, emotions);
  }

  // 관리자 > 댓글 삭제
  async deleteCommentByAdmin(commentId: number) {
    return await this.commentsRepository.deleteCommentByAdmin(commentId);
  }

}
