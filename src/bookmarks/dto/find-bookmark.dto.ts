import{IsInt,IsOptional}from 'class-validator'

export class FindBookmarkDto {

  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsInt()
  postId: number;

  @IsOptional()
  @IsInt()
  categoryId: number;
}
