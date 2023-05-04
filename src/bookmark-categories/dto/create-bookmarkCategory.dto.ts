import{IsString, IsInt, IsNotEmpty, IsOptional}from 'class-validator'


export class CreateBookmarkCategoryDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  name : string;
}




