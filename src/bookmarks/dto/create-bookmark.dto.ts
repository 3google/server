import{IsString, IsInt, IsNotEmpty, IsOptional}from 'class-validator'

export class CreateBookmarkDto {
  @IsOptional()
  @IsInt()
  postId: number;

  @IsOptional()
  @IsInt()
  categoryId: number;
}

