import { IsInt } from 'class-validator';

export class CreateBookmarkDto {
  @IsInt()
  postId: number;

  @IsInt()
  categoryId: number;
}
