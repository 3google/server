import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BoardType, Emotion } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}
  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto) {
    const { authorId, content, postId } = createCommentDto;

    return await this.prisma.comment.create({
      data: {
        content: content,
        authorId: authorId,
        postId: postId,
      },
    });
  }
  // 댓글 업데이트
  async updateComment(commentId: number, content: string) {
    const existingComment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
  
    console.log(existingComment)
    if (!existingComment) {
      throw new Error("Comment not found"); // 댓글이 존재하지 않으면 에러 처리
    }
    try { 
      const updateComment = await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          content: content,
        },
      });
      console.log(updateComment);
      return updateComment;
    } catch (error){
      console.error(`Failed to update comment: ${error}`);
      throw new Error("Failed to update comment");
    }
  }

  // 댓글 삭제
  async deleteComment(commentId: number) {
    return await this.prisma.comment.delete({
      where: { id: commentId },
    });
  }

  async deleteCommentsByPostId(postId: number) {
    return await this.prisma.comment.updateMany({
      where: { postId },
      data: { deletedAt: new Date() },
    });
  }

  //댓글 조회
  async findCommentsByPostId(postId: number) {
    return await this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
  }

  // 유저 > 댓글 조회 
  async findCommentById(userId: number) {
    return await this.prisma.comment.findUnique({
      where : { id: userId }, 
      include : { author: true },
    })
  }

  // 유저 > 댓글 삭제 
  async deleteCommentById(userId: number) { 
    return await this.prisma.comment.delete({
      where: { id : userId },
    })

  }

  // 관리자 > 전체 댓글 조회
  async findCommentByAdmin(userId: number, boardType: BoardType, emotion: Emotion) {
    return await this.prisma.post.findMany({
      where: {
        id: userId, 
        boardType: boardType, 
        emotion: emotion,
      },
    });
  }

  // 관리자 > 댓글 삭제
  async deleteCommentByAdmin(commentId: number) {
    return await this.prisma.comment.delete({
      where : { id: commentId },
    })
  }

}
