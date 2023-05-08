import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}
  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto) {
    const { authorId, content, postId } = createCommentDto;

    return this.prisma.comment.create({
      data: {
        content: content,
        authorId: authorId,
        postId: postId,
      },
    });
  }
  // 댓글 업데이트
  async updateComment(id: number, content: string) {
    return this.prisma.comment.update({
      where: { id: id },
      data: {
        content: content,
      },
    });
  }

  // 댓글 삭제
  async deleteComment(commentId: number) {
    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
