import { Emotion, BoardType } from '@prisma/client';
import { IsInt, IsString, IsEnum } from 'class-validator';
export class CreatePostDto {
  @IsInt()
  authorId: number; //나중에 토큰에서 읽어오기
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsEnum(BoardType)
  boardType: BoardType;
  @IsEnum(Emotion)
  emotion: Emotion;
}
