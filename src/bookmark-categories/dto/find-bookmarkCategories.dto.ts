import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class FindBookmarkCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  user_id: number;
}
