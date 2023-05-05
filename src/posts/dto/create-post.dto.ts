import { Emotion, BoardType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsEnum,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';

export class PostDto {
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

export class RecommendDto {
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  movies: [number];
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  musics: [number];
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  books: [number];
}

export class CreatePostDto {
  @Type(() => PostDto)
  @ValidateNested()
  post: PostDto;
  @Type(() => RecommendDto)
  @ValidateNested()
  recommendContents: RecommendDto;
}
