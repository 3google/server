import { IsString } from 'class-validator';

export class UpdateBookmarkCategoryDto {
  @IsString()
  name: string;
}
