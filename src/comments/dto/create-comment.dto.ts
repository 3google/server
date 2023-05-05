import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt()
  authorId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  postId: number;
}
