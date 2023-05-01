import { Emotion, BoardType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
export class FindPostsQueryDto {
  @IsOptional()
  @IsEnum(BoardType)
  boardType?: BoardType;
  @IsOptional()
  @IsEnum(Emotion)
  emotion?: Emotion;
}
