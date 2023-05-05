import { IsString, IsInt } from 'class-validator';

export class CreateBookmarkCategoryDto {
  @IsInt()
  userId: number;

  @IsString()
  name: string;
}
