import { Emotion, BoardType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsString, IsEnum } from 'class-validator';
export class CreatePostDto {
  @IsInt()
  author_id: number; //나중에 토큰에서 읽어오기
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsEnum(BoardType)
  board_type: BoardType;
  @IsEnum(Emotion)
  emotion: Emotion;
}
