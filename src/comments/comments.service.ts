import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private commentsRepository: CommentsRepository) {}
  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto) {
    return await this.commentsRepository.createComment(createCommentDto);
  }

  // 댓글 업데이트
  async updateComment(id: number, content: string) {
    return await this.commentsRepository.updateComment(id, content);
  }

  // 댓글 삭제
  async deleteComment(commentId: number) {
    return await this.commentsRepository.deleteComment(commentId);
  }
}
