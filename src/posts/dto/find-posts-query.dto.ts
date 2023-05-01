import { Emotion, BoardType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
export class FindPostsQueryDto {
  @IsOptional()
  @IsEnum(BoardType)
  board_type?: BoardType;
  @IsOptional()
  @IsEnum(Emotion)
  emotion?: Emotion;
}
