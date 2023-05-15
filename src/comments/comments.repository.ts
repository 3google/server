import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BoardType, Emotion } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}
  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto) {
    const { authorId, content, postId } = createCommentDto;

    if (!authorId || !content || !postId) {
      throw new Error('댓글 작성에 필요한 필드가 누락되었습니다.');
    }
  
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
    try {
      const existingComment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
    
      if (!existingComment) {
        throw new Error("Comment not found");
      }

      const deleteComment = await this.prisma.comment.delete({
        where: { id: commentId },
      });

      return deleteComment;
    } catch (error) {
      console.error(`Failed to delete comment: ${error}`);
      throw new Error("Failed to delete comment");
    }
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
  async findCommentById(authorId: number) {
    try {
      if (!authorId) {
        throw new HttpException('작성자 ID가 필요합니다.', HttpStatus.BAD_REQUEST);
      }
  
      return await this.prisma.comment.findUnique({
        where: { id: authorId },
        include: { author: true },
      });
    } catch (error) {
      console.error(`Failed to find comment by ID: ${error}`);
      throw new HttpException('댓글 조회에 실패했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 유저 > 댓글 삭제 
  async deleteCommentById(userId: number) { 
    try {
      if (!userId) {
        throw new HttpException('사용자 ID가 필요합니다.', HttpStatus.BAD_REQUEST);
      }
  
      const existingComment = await this.prisma.comment.findUnique({
        where: { id: userId },
      });
  
      if (!existingComment) {
        throw new HttpException('삭제할 댓글이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
      }
  
      return await this.prisma.comment.delete({
        where: { id: userId },
      });
    } catch (error) {
      console.error(`Failed to delete comment: ${error}`);
      throw new HttpException('댓글 삭제에 실패했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 관리자 > 전체 댓글 조회
  async findCommentByAdmin(userId: number, boardType: BoardType, emotion: Emotion) {
    if (!userId) {
      throw new HttpException('사용자 ID가 필요합니다.', HttpStatus.BAD_REQUEST);
    }
  
    // 나머지 필요한 유효성 검사 로직 추가
  
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
    if (!commentId) {
      throw new HttpException('댓글 ID가 필요합니다.', HttpStatus.BAD_REQUEST);
    }
  
    // 나머지 필요한 유효성 검사 로직 추가
  
    return await this.prisma.comment.delete({
      where: { id: commentId },
    });
  }

}
